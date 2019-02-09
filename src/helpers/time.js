const secondsInMinute = 60;

module.exports.secondsToMinutes = (seconds) => {
  return Math.round(seconds / secondsInMinute);
};