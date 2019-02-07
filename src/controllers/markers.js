const types = require("../models/types");

const Wifis = require("../models/wifis");
const Toilets = require("../models/toilets");

const getProperModel = (text) => {
  switch (text) {
    case types.wifi:
      return Wifis;
    case types.toilets:
      return Toilets;
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
    maxDistance: 10000
  });

  if (nearestMarker) {
    return nearestMarker;
  }
  return null;
};