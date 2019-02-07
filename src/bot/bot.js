const TelegramBot = require("node-telegram-bot-api");

const markersController = require("../controllers/markers");
const routesController = require("../controllers/route");

const keyboards = require("./keyboards");
const messages = require("./messages");

const token = process.env.TELEGRAM_TOKEN;
let bot;

if (process.env.NODE_ENV === "production") {
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
  bot = new TelegramBot(token, {
    polling: true
  });
}

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, messages.start, keyboards.choiseOptions);
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, messages.help, keyboards.markdownOptions);
});

bot.onText(/\/info/, (msg) => {
  bot.sendMessage(msg.chat.id, messages.info, keyboards.markdownOptions);
});

bot.onText(/\/about/, (msg) => {
  bot.sendMessage(msg.chat.id, messages.about, keyboards.markdownOptions);
});

const sendFreebee = async (msg, location) => {
  if (!msg) {
    return;
  }
  const marker = await markersController.getNearestMarker(msg.data, location);
  if (marker) {
    const start = [location.latitude, location.longitude];
    const finish = marker.location.coordinates;
    const summary = await routesController.requestRouteData(start, finish);
    bot.sendMessage(msg.message.chat.id, messages.result(marker, summary), keyboards.markdownOptions).then(() => {
      bot.sendLocation(msg.message.chat.id, finish[0], finish[1]).then(() => {
        setTimeout(() => bot.sendMessage(msg.message.chat.id, messages.reminder), 3000);
      });
    });
  } else {
    bot.sendMessage(msg.message.chat.id, messages.error, keyboards.markdownOptions);
  }
};

bot.on("callback_query", (callbackMessage) => {
  bot.sendMessage(callbackMessage.message.chat.id, messages.request).then(() => {
    bot.on("location", (locationMessage) => {
      sendFreebee(callbackMessage, locationMessage.location);
      callbackMessage = null;
    });
  });
});

module.exports = bot;