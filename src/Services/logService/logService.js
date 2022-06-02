const fs = require('fs/promises');

async function logReader() {
  const filePath = 'src/logs/log.json';
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const dataJsonParsed = JSON.parse(data);
    return dataJsonParsed;
  } catch (err) {
    console.log(`❌ Ocorreu um erro de log: ${err.message}`);
  }
}

async function logWriter(atribute, value) {
  const filePath = 'src/logs/log.json';
  
  const fileUpdated = await logReader();
  fileUpdated[atribute] = value;
  const fileUpdatedString = JSON.stringify(fileUpdated, null, 2)
  
  try {
    await fs.writeFile(filePath, fileUpdatedString);
    console.log("🟨 Log atualizado");
  } catch (err) {
    console.log(`❌ Ocorreu um erro de log: ${err.message}`);
  }
}

module.exports = {
  logReader,
  logWriter,
};