const {
  setStartUpAppTimeStamp,
  getStartUpAppTimeStamp,
  getStartUpAppDateBR,
  getStartUpAppHourComplete,
} = require('./hourService');
const { baseHourReader, cookieReader, dateReader } = require('./readService');
const { logReader, logWriter } = require('./logService');


module.exports = {
  setStartUpAppTimeStamp,
  getStartUpAppTimeStamp,
  getStartUpAppDateBR,
  getStartUpAppHourComplete,

  baseHourReader,
  cookieReader,
  dateReader,

  logReader,
  logWriter,
}