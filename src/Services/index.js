const {
  setStartUpAppTimeStamp,
  getStartUpAppTimeStamp,
  getStartUpAppDateBR,
  getStartUpAppHourComplete,
} = require('./hourService');
const { baseHourReader, cookieReader, dateReader } = require('./readService');
const { logWriter } = require('./writeService');


module.exports = {
  setStartUpAppTimeStamp,
  getStartUpAppTimeStamp,
  getStartUpAppDateBR,
  getStartUpAppHourComplete,

  baseHourReader,
  cookieReader,
  dateReader,
  logWriter,
}