const { baseHourReader, cookieReader, dateReader } = require('../Services/readService/readService');

const getReadBaseHour = async () => {
  const baseHour = await baseHourReader();
  return baseHour;
};

const getReadCookie = async () => {
  const cookie = await cookieReader();
  return cookie;
};

const getReadDate = async () => {
  const dateArray = await dateReader();
  return dateArray;
};

startUpAppHour(); // retorna data ex: 02/06/2022;
