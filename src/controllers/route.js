const axios = require("axios");

const baseHereRoutingApi = `${process.env.REACT_APP_HERE_ROUTE_API}?app_id=${process.env.REACT_APP_HERE_APP_ID}&app_code=${process.env.REACT_APP_HERE_APP_CODE}`;

const mode = "fastest;pedestrian;traffic:disabled";

const buildPointString = (coordinates) => {
  return `geo!${coordinates[0]},${coordinates[1]}`;
}

const buildRoutingApiUrl = (first, second) => {
  const start = buildPointString(first);
  const finish = buildPointString(second);
  return `${baseHereRoutingApi}&waypoint0=${start}&waypoint1=${finish}&mode=${mode}`;
};

module.exports.requestRouteData = async (first, second) => {
  const url = buildRoutingApiUrl(first, second);  
  const response = await axios.get(url);
  const summary = response.data.response.route[0].summary;
  return {
    time: summary.travelTime,
    distance: summary.distance
  };
};