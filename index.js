const express = require('express');
const bodyParser = require('body-parser');
const fs = require('./helpers/readWrite');
const { isEmailValid, isPasswordValid } = require('./middlewares/validations');

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

app.get('/talker/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const talker = await fs.read();
    const [search] = talker.filter((person) => person.id === Number(id)); 
    if (!search) {
      return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return response.status(200).json(search);
  } catch (err) {
    return response.status(500).json({ message: 'Servidor não encontrado' });
  }
});

app.post('/login', isEmailValid, isPasswordValid, async (request, response) => {
  const { email, password } = request.body;
  const newUser = {
    email,
    password,
  };
  const currentUser = await fs.read();
  const tokenGenerator = () => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTVWXYZ';
    let tokenRandom = '';
    for (let i = 1; i <= 16; i += 1) {
      const randomCharacter = Math.floor(Math.random() * characters.length);
      tokenRandom += characters[randomCharacter];
    }
    return tokenRandom;
  }; 
  const updatedUser = [...currentUser, newUser];
  await fs.write(updatedUser);
  return response.status(200).json({ token: tokenGenerator() });
});

app.listen(PORT, () => {
  console.log('Online');
});
