const package = require("../../package.json");

const TelegramBot = require("node-telegram-bot-api");

const wifiControllers = require("../controllers/wifi");

const token = process.env.TELEGRAM_TOKEN;
let bot;

if(process.env.NODE_ENV === "production") {
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new TelegramBot(token, { polling: true });
}

const choiseOptions = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{text: "Wi-Fi", request_location: true}],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  }),
};

const markdownOptions = {
  parse_mode: "Markdown"
};

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Привет! Что ищем?", choiseOptions);   
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, "🗒 *Список команд:*\n\n/start — Начало работы с ботом;\n\n/about — Информация о боте;\n/info — Узнать о проекте Freebee.", markdownOptions);  
});

bot.onText(/\/info/, (msg) => {
  bot.sendMessage(msg.chat.id, "🔑 *Информация*\n\n*Freebee* — приложение, предназначенное для поиска бесплатных возможностей в городе. Бот *Freebee Navigator* является частью растущей экосистемы *Freebee*.\n\n🔗 *Полезные ссылки*\n\n🌍 [Сайт](https://freebee.by/)\n🗺 [Карта халявы](https://freebee.by/map.html)", markdownOptions);  
});

bot.onText(/\/about/, (msg) => {
  bot.sendMessage(msg.chat.id, `🤖 *О боте*\n\n*Freebee Navigator* — бот для Telegram, он позволяет с легкостью отыскать ближайшую халяву определенного типа из базы данных приложения *Freebee*.\n\n🚀 Для начала работы введите /start. Обратите внимание — бот использует ваше текущее местоположение, но мы не храним его и никак больше не используем. Нам это банально не интересно!\n\n⏳ *Версия:* ${package.version}\n\n🔗 *Репозиторий бота:* [freebee-telegram-bot](https://github.com/FreebeeTeam/freebee-telegram-bot)`, markdownOptions);  
});

bot.on("location", async (msg) => {
  const result = await wifiControllers.getNearestWifi(msg);
  if (result) {
    bot.sendMessage(msg.chat.id, `*${result.title}*\n\n🎯 Адрес: ${result.address}\n\nℹ️ ${result.description}`, markdownOptions).then(() => {
      bot.sendLocation(msg.chat.id, result.location[0], result.location[1]).then(() => {
        setTimeout(() => bot.sendMessage(msg.chat.id, "Что-нибудь еще?", choiseOptions), 2000);
      });
    });
  } else {
    bot.sendMessage(msg.chat.id, "*Oops!*\n\nЯ ничего не нашел, хотя очень старался. Возможно, что рядом с вами просто нет халявы (хотя мне кажется, что просто кто-то деплоит на сервер или настраивает базу данных).\n\nКак бы то ни было, попробуйте повторить поиск позже или свяжитесь с разработчиками.\n\n*E-mail:* development@mail.freebee.by", markdownOptions);
  }
});

module.exports = bot;