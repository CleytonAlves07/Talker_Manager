const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
const fs = require('./helpers/readWrite');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  try {
    const talker = await fs.read();
    return response.status(200).json(talker);
  } catch (e) {
    console.log(e.message);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
