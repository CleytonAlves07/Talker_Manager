const isEmailValid = (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;

  if (!email || email.length === 0) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const isPasswordValid = (req, res, next) => {
  const { password } = req.body;

  if (!password || password.length === 0) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const isTokenValid = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

const isNameValid = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.length === 0) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const isAgeValid = (req, res, next) => {
  const { age } = req.body;
  
  if (!age || age.length === 0) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18 || age % 1 !== 0) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const isTalkValid = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  next();
};

const isWatchedAtValid = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const regex = (/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i);
  if (!watchedAt || watchedAt.length === 0) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!regex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const isRateValid = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  next();
};

module.exports = {
  isEmailValid,
  isPasswordValid,
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isWatchedAtValid,
  isRateValid,
};