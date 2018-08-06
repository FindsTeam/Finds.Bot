const TelegramBot = require('node-telegram-bot-api');

const token = '687830696:AAHPQe3Qt7G6tnuXuNMoRGOOivlAyNHgqKQ';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Привет!\nСписок доступных команд:\n/wifi - Выводит адрес ближайшего к вам хотспота");   
});

bot.onText(/\/wifi/, (msg) => {
  const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        [{text: "Отправить мое местоположение", request_location: true}],
        [{text: "Отменить", request_location: false}],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
      remove_keyboard: true
    }),
  };
  bot.sendMessage(msg.chat.id, "Укажите, пожалуйста, где вы находитесь, чтобы я смог найти ближайшую точку Wi-Fi.", opts);   
});

bot.on('location', (msg) => {
  console.log(msg.location.latitude);
  console.log(msg.location.longitude);
});