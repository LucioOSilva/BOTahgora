const dates = require('../../others/datesToRegister');

function dateReader() {
  try {
    return dates;
   
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  dateReader,
};