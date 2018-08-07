require("dotenv").config();
process.env.NTBA_FIX_319 = 1;

const TelegramBot = require("node-telegram-bot-api");

const markerControllers = require("./src/controllers/markers");

const database = require("./src/mongoose");
database.connect();

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const answerOptions = {
    reply_markup: JSON.stringify({
      keyboard: [
        [{text: "Wi-Fi", request_location: true}],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    }),
  };

  bot.sendMessage(msg.chat.id, "Привет! Что ищем?", answerOptions);   
});

bot.onText(/\/wifi/, (msg) => {
  const answerOptions = {
    reply_markup: JSON.stringify({
      keyboard: [
        [{text: "Указать местоположение", request_location: true}],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    }),
  };
  
  bot.sendMessage(msg.chat.id, "Укажите, пожалуйста, где вы находитесь, чтобы я смог найти ближайшую точку Wi-Fi.", answerOptions);  
});

bot.on("location", async (msg) => {
  const answerOptions = {
    parse_mode: "Markdown"
  };
  const result = await markerControllers.getNearestMarker(msg);
  bot.sendMessage(msg.chat.id, `*${result.title}*\n\n🎯 Адрес: ${result.address}\n\nℹ️ ${result.description}`, answerOptions).then(() => {
    bot.sendLocation(msg.chat.id, result.location[0], result.location[1]);
  }); 
});