const Markers = require("../models/markers");

module.exports.getNearestMarker = async (msg) => {
  const lat = parseFloat(msg.location.latitude);
  const lng = parseFloat(msg.location.longitude);
  const nearestMarker = await Markers.findOne().where("location").near({
    center: {
      type: "Point",
        coordinates: [lat, lng]
    },
    maxDistance: 10000
  });

  if (nearestMarker) {
    return nearestMarker;
  }
  return null;
};