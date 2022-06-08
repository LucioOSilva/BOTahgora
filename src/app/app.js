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
    const dayToPunch = dates.find((day) => day === startUpAppDate);
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
      const timeToNextPunchMS = new Date(firstHour - startUpAppStamp).getTime();
      if (timeToNextPunchMS < 0) {
        const oneDayInMS = 60 * 60 * (24 - startWorkHour) * 1000;
        const timeToNextPunchDayMS = oneDayInMS + timeToNextPunchMS;
        return timeToNextPunchDayMS;
      }
      return timeToNextPunchMS;
    }

    const showHours = (timeMS) => {
      const fuso = 3 * 60 * 60 * 1000
      const date = new Date(timeMS + fuso).toLocaleTimeString()
      return date;
    }

    if (startWorkHourTimeStamp >= startUpAppTimeStamp) {
      console.log('✅ App iniciado antes da hora do "início da jornada"');
      const timeUntilFirstPunch = getTimeUntilfirstPunchInMS(startWorkHourTimeStamp, startUpAppTimeStamp);
      console.log(`🟨 Tempo até a primeira batida: ${showHours(timeUntilFirstPunch)}`);
      return [1, startWorkHourTimeStamp, timeUntilFirstPunch];
    }
    else if (startLunchHourTimeStamp >= startUpAppTimeStamp) {
      console.log('✅ App iniciado antes da hora do "início do almoço"');
      const timeUntilFirstPunch = getTimeUntilfirstPunchInMS(startLunchHourTimeStamp, startUpAppTimeStamp);
      console.log(`🟨 Tempo até a primeira batida: ${showHours(timeUntilFirstPunch)}`);
      return [2, startLunchHourTimeStamp, timeUntilFirstPunch];
    }
    else if (finishLunchHourTimeStamp >= startUpAppTimeStamp) {
      console.log('✅ App iniciado antes da hora do "fim do almoço"');
      const timeUntilFirstPunch = getTimeUntilfirstPunchInMS(finishLunchHourTimeStamp, startUpAppTimeStamp);
      console.log(`🟨 Tempo até a primeira batida: ${showHours(timeUntilFirstPunch)}`);
      return [3, finishLunchHourTimeStamp, timeUntilFirstPunch];
    }
    else if (finishWorkHourTimeStamp >= startUpAppTimeStamp) {
      console.log('✅ App iniciado antes da hora do "fim da jornada"');
      const timeUntilFirstPunch = getTimeUntilfirstPunchInMS(finishWorkHourTimeStamp, startUpAppTimeStamp);
      console.log(`🟨 Tempo até a primeira batida: ${showHours(timeUntilFirstPunch)}`);
      return [4, finishWorkHourTimeStamp, timeUntilFirstPunch];
    }
    else {
      console.log('✅ App iniciado com mais de um dia de espera, agendado para proximo dia!')
      const timeUntilFirstPunch = getTimeUntilfirstPunchInMS(finishWorkHourTimeStamp, startUpAppTimeStamp);
      console.log(`🟨 Tempo até a primeira batida: ${showHours(timeUntilFirstPunch)}`);
      return [5, finishWorkHourTimeStamp, timeUntilFirstPunch];
    }
  }
  return [0, 'OPS... verifique as datas "deve conter a data atual e a data do proximo dia", app não inicializado!']
}

const createListToPunch = (firstDayHourToPunchArray) => {
  const { dates } = dateReader();
  const { hourCompanyPreset, minutesVariation } = companyHours;
  const { startWorkHour, startLunchHour, finishLunchHour, finishWorkHour } = hourCompanyPreset;
  const hoursToMS = (hour) => hour * 60 * 60 * 1000
  const timeStampInitialStartApp = setStartUpAppTimeStamp();
  const sleepListItemsTotal = (dates.length - 1) * 4 + firstDayHourToPunchArray[0]; // numero de vezes que preenchera a lista de pontos
  const timeSleepList = [timeStampInitialStartApp.getTime() + (firstDayHourToPunchArray[2])] // inicia variavel array de items da lista de pontos

  const randomNumberMS = (min, max) => (Math.random() * (max - min) + min) * 60 * 1000;

  
  const workStartEndVariation = randomNumberMS(0, minutesVariation)
  const lunchStartEndVariation = randomNumberMS(-minutesVariation, minutesVariation)
  if (firstDayHourToPunchArray[0] === 0) { return firstDayHourToPunchArray[1]}
  let flag = firstDayHourToPunchArray[0]
  let triggerTimeVariation = firstDayHourToPunchArray[0] === 5 ? true : false
  for (let index = 0; index < sleepListItemsTotal; index += 1) {

    let lastTimeMS = timeSleepList[index]
    if (flag === 5) {
      const timeSleep = hoursToMS(startLunchHour - startWorkHour)
      const timeToNextPunch = lastTimeMS + timeSleep // aqui adicionar a variação de tempo
      timeSleepList.push(timeToNextPunch)
    }
    else if (flag === 4) {
      const timeSleep = hoursToMS((24 - finishWorkHour + startWorkHour))
      const timeToNextPunch = lastTimeMS + timeSleep + workStartEndVariation// aqui adicionar a variação de tempo
      if (triggerTimeVariation) timeToNextPunch 
      timeSleepList.push(timeToNextPunch)
    }
    else if (flag === 3) {
      const timeSleep = hoursToMS(startLunchHour - startWorkHour)
      const timeToNextPunch = lastTimeMS + timeSleep + lunchStartEndVariation// aqui adicionar a variação de tempo
      timeSleepList.push(timeToNextPunch)
    }
    else if (flag === 2) {
      const timeSleep = hoursToMS(finishLunchHour - startLunchHour)
      const timeToNextPunch = lastTimeMS + timeSleep // aqui adicionar a variação de tempo
      timeSleepList.push(timeToNextPunch)
    }
    else if (flag === 1) {
      const timeSleep = hoursToMS(finishWorkHour - finishLunchHour)
      const timeToNextPunch = lastTimeMS + timeSleep - lunchStartEndVariation// aqui adicionar a variação de tempo
      timeSleepList.push(timeToNextPunch)
    }
    lastTimeMS = lastTimeMS - workStartEndVariation
    if (flag <= 1) {
      flag = 5
    } 
    flag -= 1
  }
  return timeSleepList
};

const showPunchListDates = (punchList) => {
  punchList.map((punch) => {
    const date = new Date(punch)
    const showDateFormated = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;
    console.log(`➡  ${showDateFormated}`)
  })
}

const calculateNextPunches = () => {
  console.log(`🟨 Calculando próximas batidas...`);
  const firstPunchArray = retrieveFirstPunch();  // [ 2, 2022-06-08T15:00:00.000Z, 5696058 ]
  console.log(`🟨 Criando lista das próximas batidas...`);
  const timeSleepList = createListToPunch(firstPunchArray);
  console.log(`🟨 Próximas batidas...`);
  showPunchListDates(timeSleepList)
}

const startUpDate = () => {
  console.log(`🟧 App de bater ponto "Ahgora" inicializando. . .`);
  setStartUpAppTimeStamp();
  const startDateFormated = `${getStartUpAppDateBR()}-${getStartUpAppHourComplete()}`;
  console.log(`✅ App Punch_The_Clock inicializado! ⏰ Data-hora:${startDateFormated}`);
};

const startApp = () => {
  startUpDate();
  calculateNextPunches();
  
};

startApp();
