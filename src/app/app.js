const { companyHours } = require('../others/baseHour')
const {
  setStartUpAppTimeStamp,
  getStartUpAppTimeStamp,
  getStartUpAppDateBR,
  getStartUpAppHourComplete,
  logReader,
  logWriter,
  baseHourReader,
  dateReader
} = require('../Services');


function retrieveFirstPunch (dateArray) {
  const { hourCompanyPreset } = companyHours;
  const { startWorkHour, startLunchHour, finishLunchHour, finishWorkHour } = hourCompanyPreset;
  const startUpAppTimeStamp = getStartUpAppTimeStamp();
  
  const [dayDate, monthDate, yearDate] = dateArray[0].split('/');

  const startWorkHourTimeStamp = new Date(yearDate, monthDate -1, dayDate, startWorkHour, 0); // hora inicio
  const startLunchHourTimeStamp = new Date(yearDate, monthDate -1, dayDate, startLunchHour, 0); // hora almoco
  const finishLunchHourTimeStamp = new Date(yearDate, monthDate -1, dayDate, finishLunchHour, 0); // hora volta almoco
  const finishWorkHourTimeStamp = new Date(yearDate, monthDate -1, dayDate, finishWorkHour, 0); // hora saida


  const getTimeUntilfirstPunchInMS = async (firstHourTimeStamp, startUpAppTimeStamp) => {
    const timeToNextPunchMS = new Date(firstHourTimeStamp - startUpAppTimeStamp).getTime()
    if (timeToNextPunchMS < 0) {
      const oneDayInMS = 60 * 60 * (24 - startWorkHour) * 1000;
      const timeToNextPunchDayMS = oneDayInMS + timeToNextPunchMS
      return timeToNextPunchDayMS
    }
    return timeToNextPunchMS
  }

  
  if (startWorkHourTimeStamp >= startUpAppTimeStamp) {
    console.log('Started app before "startWorkHour"');
    const timeUntilFirstPunch = getTimeUntilfirstPunchInMS(startWorkHourTimeStamp, startUpAppTimeStamp);
    console.log(timeUntilNextPunchString(timeUntilFirstPunch))
    return [1, startWorkHourTimeStamp, timeUntilFirstPunch];
  }
  else if (startLunchHourTimeStamp >= startUpAppTimeStamp) {
    console.log('Started app before "startLunchHour"');
    const timeUntilFirstPunch = getTimeUntilfirstPunchInMS(startLunchHourTimeStamp, startUpAppTimeStamp);
    console.log(timeUntilNextPunchString(timeUntilFirstPunch))
    return [2, startLunchHourTimeStamp, timeUntilFirstPunch];
  }
  else if (finishLunchHourTimeStamp >= startUpAppTimeStamp) {
    console.log('Started app before "finishLunchHour"');
    const timeUntilFirstPunch = getTimeUntilfirstPunchInMS(finishLunchHourTimeStamp, startUpAppTimeStamp);
    console.log(timeUntilNextPunchString(timeUntilFirstPunch))
    return [3, finishLunchHourTimeStamp, timeUntilFirstPunch];
  }
  else if (finishWorkHourTimeStamp >= startUpAppTimeStamp) {
    console.log('Started app before "finishWorkHour"')
    const timeUntilFirstPunch = getTimeUntilfirstPunchInMS(finishWorkHourTimeStamp, startUpAppTimeStamp);
    console.log(timeUntilNextPunchString(timeUntilFirstPunch))
    return [4, finishWorkHourTimeStamp, timeUntilFirstPunch];
  }
  else {
    console.log('Started app before the next day - all punch data will be recorded tomorrow')
    const timeUntilFirstPunch = getTimeUntilfirstPunchInMS(finishWorkHourTimeStamp, startUpAppTimeStamp);
    console.log(timeUntilNextPunchString(timeUntilFirstPunch))
    return [5, finishWorkHourTimeStamp, timeUntilFirstPunch];
  }
}

// const calculateNextPunches = () => {
//   console.log(`🟨 Calculating next punches...`)
//   console.log(`🟨 Reading dates files...`)
// }


// ---------- APP stastUP and LOGS ----------

const startUpDate = () => {
  console.log(`🟨 App Punch_The_Clock initializing...`)
  setStartUpAppTimeStamp();
  const startDateFormated = `${getStartUpAppDateBR()}-${getStartUpAppHourComplete()}`
  logWriter("startedAppAt", startDateFormated);
  console.log(`✅ App Punch_The_Clock initialized! ⏰ Data:${startDateFormated}`)
}

const startApp = () => {
  startUpDate();
  //calculateNextPunches();
  // retrieveFirstPunch(['03/05/2022'])
  
}

startApp();