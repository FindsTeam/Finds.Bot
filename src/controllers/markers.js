const types = require("../models/types");

const Wifi = require("../models/wifi");
const Toilets = require("../models/toilets");
const Sockets = require("../models/sockets");
const Water = require("../models/water");

const getProperModel = (text) => {
  switch (text) {
    case types.wifi:
      return Wifi;
    case types.toilets:
      return Toilets;
    case types.sockets:
      return Sockets;
      case types.water:
      return Water;
  }
};

module.exports.getNearestMarker = async (type, location) => {
  const Model = getProperModel(type);
  const lat = parseFloat(location.latitude);
  const lng = parseFloat(location.longitude);

  const nearestMarker = await Model.findOne().where("location").near({
    center: {
      type: "Point",
      coordinates: [lat, lng]
    },
    maxDistance: 50000
  });

  if (nearestMarker) {
    return nearestMarker;
  }
  return null;
};
