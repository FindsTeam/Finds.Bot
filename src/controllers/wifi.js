const Wifis = require("../models/wifis");

module.exports.getNearestWifi = async (msg) => {
  const lat = parseFloat(msg.location.latitude);
  const lng = parseFloat(msg.location.longitude);
  const nearestWifi = await Wifis.findOne().where("location").near({
    center: {
      type: "Point",
        coordinates: [lat, lng]
    },
    maxDistance: 10000
  });

  if (nearestWifi) {
    return nearestWifi;
  }
  return null;
};