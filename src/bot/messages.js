const package = require("../../package.json");
const time = require("../helpers/time");

const missingInformation = "Информация о данной точке отсутствует.";

module.exports = {
  about: `🤖  *О боте*\n\n*Finds Bot* — бот для Telegram, он позволяет с легкостью отыскать ближайшую халяву определенного типа из базы данных платформы *Finds*.\n\n🚀  Для начала работы введите /start. Обратите внимание — бот использует ваше текущее местоположение, но мы не храним его и никак больше не используем. Нам это банально не интересно!\n\n⏳  *Версия:* ${package.version}\n\n🔗  *Репозиторий бота:* [Finds.Bot](https://github.com/FindsTeam/Finds.Bot)\n\n`,
  error: "🧯  *Oops!*\n\nЯ ничего не нашел, хотя очень старался. Возможно, что рядом с вами просто нет халявы (хотя мне кажется, что просто кто-то перезагружает сервер или настраивает базу данных).\n\nКак бы то ни было, попробуйте повторить поиск позже или свяжитесь с разработчиками.\n\n*E-mail:* development@mail.finds.by",
  info: "🔑  *Информация*\n\n*Finds* — платформа, предназначенная для поиска бесплатных возможностей в городе. *Finds Bot* является частью растущей экосистемы *Finds*.\n\n🔗  *Полезные ссылки:*\n\n🌍  [Finds Landing](https://finds.by/) — Сайт;\n\n🗺  [Finds Web](https://finds.by/map) — Карта халявы;\n\n📑  [Finds News VK](https://vk.com/findsnews) — Группа в ВК;\n\n📘  [Finds News FB](https://fb.com/findsnews) — Группа в Facebook;\n\n🗞  [Finds News](https://t.me/findsnews) — Канал в Telegram;\n\n🛠  [Finds Team](https://github.com/FindsTeam) — Репозитории проектов на GitHub.\n\n",
  help: "🗒  *Список команд:*\n\n/start — Начало работы с ботом;\n\n/about — Информация о боте;\n/info — Узнать о проекте Finds.",
  start: "Привет! Что ищем?",
  reminder: "Если я понадоблюсь - пишите /start",
  request: "Пожалуйста, отправьте местоположение точки, рядом с которой нужно поискать халяву.",
  
  result: (marker, route) => {
    return `🎯  *${marker.title}*\n\n📍  *Адрес:* ${marker.address}\n\n🚶‍♂️  *Расстояние:* ${route.distance} м.\n\n⏳  *Время в пути:* ${time.secondsToMinutes(route.time)} мин.\n\n📜 ️ ${marker.description ? marker.description : missingInformation}`;
  }
};
