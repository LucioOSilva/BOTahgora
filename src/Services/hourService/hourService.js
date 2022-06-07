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


// import {TimeSplit} from '../typings/time'

// export function parseTimeRemaining (totalSeconds: number , hasOffer:boolean): TimeSplit  {
//     const days = Math.floor (totalSeconds/ (24 * 60 * 60 * 1000))
//     const hours = Math.floor(totalSeconds/ (60 * 60 * 1000));
//     const minutes = Math.floor(totalSeconds/ (60 * 1000));
//     const seconds = Math.floor(totalSeconds / 1000);

//   return {
//     days:days,
//     hours: (hours % 24),
//     minutes: minutes % 60,
//     seconds: seconds % 60,
//     hasOffer:hasOffer
//   }
// }

// export function timeOffer( dateFinal:string){
//     const start =  new Date().getTime()
//     const final =  new Date(dateFinal).getTime()

//     const timeStampDiff =  (final) - start
//     const secondsRemaining = timeStampDiff
//     const hasOffer = secondsRemaining> 0
//     return parseTimeRemaining(secondsRemaining, hasOffer)
// }
