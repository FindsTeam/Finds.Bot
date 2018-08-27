const TelegramBot = require("node-telegram-bot-api");

const markersController = require("../controllers/markers");

const keyboards = require("./keyboards");
const package = require("../../package.json");

const token = process.env.TELEGRAM_TOKEN;
let bot;

if(process.env.NODE_ENV === "production") {
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new TelegramBot(token, { polling: true });
}

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Привет! Что ищем?", keyboards.choiseOptions);   
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, "🗒 *Список команд:*\n\n/start — Начало работы с ботом;\n\n/about — Информация о боте;\n/info — Узнать о проекте Freebee.", keyboards.markdownOptions);  
});

bot.onText(/\/info/, (msg) => {
  bot.sendMessage(msg.chat.id, "🔑 *Информация*\n\n*Freebee* — приложение, предназначенное для поиска бесплатных возможностей в городе. Бот *Freebee Navigator* является частью растущей экосистемы *Freebee*.\n\n🔗 *Полезные ссылки*\n\n🌍 [Сайт](https://freebee.by/)\n🗺 [Карта халявы](https://freebee.by/map.html)", keyboards.markdownOptions);  
});

bot.onText(/\/about/, (msg) => {
  bot.sendMessage(msg.chat.id, `🤖 *О боте*\n\n*Freebee Navigator* — бот для Telegram, он позволяет с легкостью отыскать ближайшую халяву определенного типа из базы данных приложения *Freebee*.\n\n🚀 Для начала работы введите /start. Обратите внимание — бот использует ваше текущее местоположение, но мы не храним его и никак больше не используем. Нам это банально не интересно!\n\n⏳ *Версия:* ${package.version}\n\n🔗 *Репозиторий бота:* [freebee-telegram-bot](https://github.com/FreebeeTeam/freebee-telegram-bot)`, keyboards.markdownOptions);  
});

const sendFreebee = async (msg, location) => {
  if (!msg) {
    return ;
  }
  const result = await markersController.getNearestMarker(msg.data, location);
  if (result) {
    bot.sendMessage(msg.message.chat.id, `*${result.title}*\n\n🎯 Адрес: ${result.address}\n\nℹ️ ${result.description ? result.description : "Информация о данной точке отсутствует"}`, keyboards.markdownOptions).then(() => {
      bot.sendLocation(msg.message.chat.id, result.location[0], result.location[1]).then(() => {
        setTimeout(() => bot.sendMessage(msg.message.chat.id, "Если я понадоблюсь - пишите /start"), 3000);
      });
    });
  } else {
    bot.sendMessage(msg.chat.id, "*Oops!*\n\nЯ ничего не нашел, хотя очень старался. Возможно, что рядом с вами просто нет халявы (хотя мне кажется, что просто кто-то деплоит на сервер или настраивает базу данных).\n\nКак бы то ни было, попробуйте повторить поиск позже или свяжитесь с разработчиками.\n\n*E-mail:* development@mail.freebee.by", keyboards.markdownOptions);
  }
};

bot.on("callback_query", (callbackMessage) => {
  bot.sendMessage(callbackMessage.message.chat.id, "Пожалуйста, отправьте местоположение точки, рядом с которой нужно поискать халяву.").then(() => {
    bot.on("location", (locationMessage) => {
      sendFreebee(callbackMessage, locationMessage.location);
      callbackMessage = null;
    });
  });
});

module.exports = bot;