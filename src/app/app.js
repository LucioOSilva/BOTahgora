const {
  setStartUpAppTimeStamp,
  getStartUpAppDateBR,
  getStartUpAppHourComplete,
  logReader,
  logWriter,
  baseHourReader
} = require('../Services');


const startUpDate = () => {
  setStartUpAppTimeStamp();
  logWriter("startedAppAt", `${getStartUpAppDateBR()}-${getStartUpAppHourComplete()}`);
  console.log(`✅ App Punch_The_Clock inicializado! ⏰ Data:${getStartUpAppDateBR()} - ${getStartUpAppHourComplete()}`)
}

const calculateNextPunches = async () => {
  const [day, month, year] = getStartUpAppDateBR().split('/');
  const [hour, minute, second] = getStartUpAppHourComplete().split(':');
  const { minutesVariation, hourCompanyPreset } = await baseHourReader();


  console.log(day, month, year, hour, minute, second)
  const d = new Date(day, month, year, hour, minute, second)
  
  
}


// APP stastUP function
const startApp = () => {
  startUpDate();
  calculateNextPunches();
  
}

startApp();