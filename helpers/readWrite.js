const fs = require('fs/promises');

async function read() {
  try {
    const data = await fs.readFile('talker.json', { encoding: 'utf8' });
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

async function write(data) {
  try {
    await fs.writeFile('talker.json', JSON.stringify(data));
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  read,
  write,
};