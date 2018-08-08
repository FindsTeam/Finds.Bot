process.env.NTBA_FIX_319 = 1;

require("dotenv").config();
require("./src/mongoose").connect();

const bot = require("./src/bot/bot.js");
require("./src/web")(bot);
