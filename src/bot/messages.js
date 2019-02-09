const package = require("../../package.json");
const time = require("../helpers/time");

const missingInformation = "Информация о данной точке отсутствует.";

module.exports = {
  about: `🤖  *О боте*\n\n*Freebee Bot* — бот для Telegram, он позволяет с легкостью отыскать ближайшую халяву определенного типа из базы данных платформы *Freebee*.\n\n🚀  Для начала работы введите /start. Обратите внимание — бот использует ваше текущее местоположение, но мы не храним его и никак больше не используем. Нам это банально не интересно!\n\n⏳  *Версия:* ${package.version}\n\n🔗  *Репозиторий бота:* [Freebee.Bot](https://github.com/FreebeeTeam/Freebee.Bot)`,
  error: "🧯  *Oops!*\n\nЯ ничего не нашел, хотя очень старался. Возможно, что рядом с вами просто нет халявы (хотя мне кажется, что просто кто-то перезагружает сервер или настраивает базу данных).\n\nКак бы то ни было, попробуйте повторить поиск позже или свяжитесь с разработчиками.\n\n*E-mail:* development@mail.freebee.by",
  info: "🔑  *Информация*\n\n*Freebee* — платформа, предназначенная для поиска бесплатных возможностей в городе. *Freebee Bot* является частью растущей экосистемы *Freebee*.\n\n🔗  *Полезные ссылки*\n\n🌍  [Сайт](https://freebee.by/)\n🗺  [Карта халявы](https://freebee.by/map.html)",
  help: "🗒  *Список команд:*\n\n/start — Начало работы с ботом;\n\n/about — Информация о боте;\n/info — Узнать о проекте Freebee.",
  start: "Привет! Что ищем?",
  reminder: "Если я понадоблюсь - пишите /start",
  request: "Пожалуйста, отправьте местоположение точки, рядом с которой нужно поискать халяву.",
  
  result: (marker, route) => {
    return `🎯  *${marker.title}*\n\n📍  *Адрес:* ${marker.address}\n\n🚶‍♂️  *Расстояние:* ${route.distance} м.\n\n⏳  *Время в пути:* ${time.secondsToMinutes(route.time)} мин.\n\n📜 ️ ${marker.description ? marker.description : missingInformation}`;
  }
};