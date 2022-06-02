const {
  setStartUpAppTimeStamp,
  getStartUpAppDateBR,
  getStartUpAppHourComplete,
  
  logWriter,
  baseHourReader,
  dateReader
} = require('../Services');


const startUpDate = () => {
  setStartUpAppTimeStamp();
  logWriter("startedAppAt", `${getStartUpAppDateBR()}-${getStartUpAppHourComplete()}`);
  console.log(`✅ App Punch_The_Clock inicializado! ⏰ Data:${getStartUpAppDateBR()} - ${getStartUpAppHourComplete()}`)
}

const calculateNextPunches = async () => {
  const [day, month, year] = getStartUpAppDateBR().split('/');
  const [hour, minute, second] = getStartUpAppHourComplete().split(':');
  const datesArray = await dateReader();
  const { minutesVariation, hourCompanyPreset } = await baseHourReader();
  // setTimeout(() => {
  //   console.log('timeout1500')
  // }, 1500);
  // setTimeout(() => {
  //   console.log('timeout2000')
  // }, 2000);

  // setTimeout(() => {
  //   console.log('timeout3500')
  // }, 2500);
  // setTimeout(() => {
  //   console.log('timeout3000')
  // }, 3000);
  // setTimeout(() => {
  //   console.log('timeout4500')
  // }, 3500);
  // setTimeout(() => {
  //   console.log('timeout4000')
  // }, 4000);
  // setTimeout(() => {
  //   console.log('timeout5500')
  // }, 4500);
  // setTimeout(() => {
  //   console.log('timeout6000')
  // }, 5000);
  // setTimeout(() => {
  //   console.log('timeout6500')
  // }, 5500);
  // setTimeout(() => {
  //   console.log('timeout6000')
  // }, 6000);
  
  // console.log(datesArray)


  // console.log(day, month, year, hour, minute, second)
  // const d = new Date(day, month, year, hour, minute, second)
  
  
}


// APP stastUP function
const startApp = () => {
  startUpDate();
  calculateNextPunches();
  
}

startApp();