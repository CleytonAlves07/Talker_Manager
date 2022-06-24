const fs = require('fs/promises');

async function read() {
    const data = await fs.readFile('talker.json', { encoding: 'utf8' });
    return JSON.parse(data);
}

async function write(data) {
  try {
    await fs.writeFile('talker.json', JSON.stringify(data, null, 2));
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  read,
  write,
};