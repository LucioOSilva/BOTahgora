const fs = require('fs/promises');

function logReader() {
  const filePath = 'src/logs/log.json';
  try {
    console.log("🟨 Log reading in progress...");
    const data = fs.readFile(filePath, 'utf8').then(data => JSON.parse(data));
    return data;
  } catch (err) {
    console.log(`❌ Something bad happened at log file: ${err.message}`);
  }
}

function logWriter(atribute, value) {
  const filePath = 'src/logs/log.json';
  
  try {
    const fileUpdated = logReader();
    fileUpdated[atribute] = value;
    const fileUpdatedString = JSON.stringify(fileUpdated, null, 2)
    fs.writeFile(filePath, fileUpdatedString).then(() => {
      console.log("🟩 Log write saved success")
    });
  } catch (err) {
    console.log(`❌ Something bad happened at log file: ${err.message}`);
  }
}

module.exports = {
  logReader,
  logWriter,
};