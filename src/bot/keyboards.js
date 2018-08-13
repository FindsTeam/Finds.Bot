const types = require("../models/types");

module.exports.markdownOptions = {
  parse_mode: "Markdown"
};

module.exports.choiseOptions = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{text: types.wifi, callback_data: types.wifi}],
      [{text: types.toilets, callback_data: types.toilets}],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  }),
};

module.exports.requestLocation = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{text: "Указать свое местоположение", request_location: true}],
      [{text: "Отменить", request_location: false}],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  }),
};