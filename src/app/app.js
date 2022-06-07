const { companyHours } = require('../others/baseHour')
const {
  setStartUpAppTimeStamp,
  getStartUpAppTimeStamp,
  getStartUpAppDateBR,
  getStartUpAppHourComplete,
  dateReader
} = require('../Services');


function retrieveFirstPunch () {
  const { hourCompanyPreset } = companyHours;
  const { startWorkHour, startLunchHour, finishLunchHour, finishWorkHour } = hourCompanyPreset;
  const startUpAppDate = getStartUpAppDateBR();
  const startUpAppTimeStamp = getStartUpAppTimeStamp();
  const { dates } = dateReader();

  const isADayToPunch = () => {
    const dayToPunch = dates.find((day) => day === startUpAppDate)
    return dayToPunch;
  }

  if (isADayToPunch()) {
    const [dayDate, monthDate, yearDate] = isADayToPunch().split('/');

    // create first date instances
    const startWorkHourTimeStamp = new Date(yearDate, monthDate -1, dayDate, startWorkHour, 0); // hora inicio
    const startLunchHourTimeStamp = new Date(yearDate, monthDate -1, dayDate, startLunchHour, 0); // hora almoco
    const finishLunchHourTimeStamp = new Date(yearDate, monthDate -1, dayDate, finishLunchHour, 0); // hora volta almoco
    const finishWorkHourTimeStamp = new Date(yearDate, monthDate -1, dayDate, finishWorkHour, 0); // hora saida

    const getTimeUntilfirstPunchInMS = (firstHour, startUpAppStamp) => {
      const timeToNextPunchMS = new Date(firstHour - startUpAppStamp).getTime()
      if (timeToNextPunchMS < 0) {
        const oneDayInMS = 60 * 60 * (24 - startWorkHour) * 1000;
        const timeToNextPunchDayMS = oneDayInMS + timeToNextPunchMS
        return timeToNextPunchDayMS
      }
      return timeToNextPunchMS
    }

    if (startWorkHourTimeStamp >= startUpAppTimeStamp) {
      console.log('✅ App iniciado antes da hora do "início da jornada"');
      const timeUntilFirstPunch = getTimeUntilfirstPunchInMS(startWorkHourTimeStamp, startUpAppTimeStamp);
      console.log(`🟨 Tempo até a primeira batida: ${timeUntilFirstPunch}`)
      return [1, startWorkHourTimeStamp, timeUntilFirstPunch];
    }
    else if (startLunchHourTimeStamp >= startUpAppTimeStamp) {
      console.log('✅ App iniciado antes da hora do "início do almoço"');
      const timeUntilFirstPunch = getTimeUntilfirstPunchInMS(startLunchHourTimeStamp, startUpAppTimeStamp);
      console.log(`🟨 Tempo até a primeira batida: ${timeUntilFirstPunch}`)
      return [2, startLunchHourTimeStamp, timeUntilFirstPunch];
    }
    else if (finishLunchHourTimeStamp >= startUpAppTimeStamp) {
      console.log('✅ App iniciado antes da hora do "fim do almoço"');
      const timeUntilFirstPunch = getTimeUntilfirstPunchInMS(finishLunchHourTimeStamp, startUpAppTimeStamp);
      console.log(`🟨 Tempo até a primeira batida: ${timeUntilFirstPunch}`)
      return [3, finishLunchHourTimeStamp, timeUntilFirstPunch];
    }
    else if (finishWorkHourTimeStamp >= startUpAppTimeStamp) {
      console.log('✅ App iniciado antes da hora do "fim da jornada"');
      const timeUntilFirstPunch = getTimeUntilfirstPunchInMS(finishWorkHourTimeStamp, startUpAppTimeStamp);
      console.log(`🟨 Tempo até a primeira batida: ${timeUntilFirstPunch}`)
      return [4, finishWorkHourTimeStamp, timeUntilFirstPunch];
    }
    else {
      console.log('✅ App iniciado com mais de um dia de espera - todas')
      const timeUntilFirstPunch = getTimeUntilfirstPunchInMS(finishWorkHourTimeStamp, startUpAppTimeStamp);
      console.log(`🟨 Tempo até a primeira batida: ${timeUntilFirstPunch}`)
      return [5, finishWorkHourTimeStamp, timeUntilFirstPunch];
    }
  } 
}

const calculateNextPunches = () => {
  console.log(`🟨 Calculando próximas batidas...`)
  console.log(retrieveFirstPunch())
}


// ---------- APP stastUP and LOGS ----------

const startUpDate = () => {
  console.log(`✅ App de bater ponto "Ahgora" inicializado...`)
  setStartUpAppTimeStamp();
  const startDateFormated = `${getStartUpAppDateBR()}-${getStartUpAppHourComplete()}`
  console.log(`✅ App Punch_The_Clock inicializado! ⏰ Data-hora:${startDateFormated}`)
}

const startApp = () => {
  startUpDate();
  calculateNextPunches();
  
}

startApp();