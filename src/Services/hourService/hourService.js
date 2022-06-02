let startTimeStamp = null;    // startUp time instance in memory

const setStartUpAppTimeStamp = () => startTimeStamp = new Date();
const getStartUpAppTimeStamp = () => startTimeStamp;
const getStartUpAppDateBR = () => startTimeStamp.toLocaleDateString('pt-BR');
const getStartUpAppHourComplete = () => startTimeStamp.toLocaleTimeString('pt-BR');


module.exports = {
  setStartUpAppTimeStamp,
  getStartUpAppTimeStamp,
  getStartUpAppDateBR,
  getStartUpAppHourComplete,
};
