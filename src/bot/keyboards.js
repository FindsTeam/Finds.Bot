const types = require("../models/types");

module.exports.markdownOptions = {
  parse_mode: "Markdown"
};

module.exports.choiseOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{
        text: types.wifi,
        callback_data: types.wifi
      }],
      [{
        text: types.toilets,
        callback_data: types.toilets
      }],
      [{
        text: types.sockets,
        callback_data: types.sockets
      }]
    ]
  })
};

module.exports.requestLocation = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{
        text: "Указать свое местоположение",
        callback_data: "location",
        callrequest_location: true
      }],
      [{
        text: "Отменить",
        callback_data: "cancel",
        request_location: false
      }],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  })
};