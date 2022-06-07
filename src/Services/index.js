const {
  setStartUpAppTimeStamp,
  getStartUpAppTimeStamp,
  getStartUpAppDateBR,
  getStartUpAppHourComplete,
} = require('./hourService');
const { dateReader } = require('./readService');


module.exports = {
  setStartUpAppTimeStamp,
  getStartUpAppTimeStamp,
  getStartUpAppDateBR,
  getStartUpAppHourComplete,
  dateReader,
}