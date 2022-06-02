const fs = require('fs/promises');

async function baseHourReader() {
  const filePath = 'src/others/baseHour.json';
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const dataJsonParsed = JSON.parse(data);
    return dataJsonParsed;
   
  } catch (err) {
    console.log(err.message);
  }
}

async function cookieReader() {
  const filePath = 'src/others/cookieUser.txt'
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return {cookie: data};
   
  } catch (err) {
    console.log(err.message);
  }
}

async function dateReader() {
  const filePath = 'src/others/datesToRegister.txt'
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const dataMap = data.split('\r\n')
    return dataMap;
   
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  baseHourReader,
  cookieReader,
  dateReader,
};