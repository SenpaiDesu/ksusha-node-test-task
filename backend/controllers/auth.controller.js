const { sign, verify } = require('jsonwebtoken');
const { compare } = require('bcrypt');
const { readJSON } = require('../tools/promisify');
const { SECRET_KEY } = require('../config');

const genToken = (user) => {
  return sign({
    id: user.id,
    username: user.username
  }, SECRET_KEY, { expiresIn: 900 });
}

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await readJSON(__dirname + '/../data/users.json');
    const user = users.find(el => { return el.username == username });
    if (user && await compare(password, user.password)) 
      res.status(200).json({ token: genToken(user) });
    else 
      res.status(422).json({ error: 'Wrong username or password' });
  } catch (error) {
    res.status(500).json({ error });
  }
}

const checkToken = (req, res, next) => {
  try {
    const token = req.get('auth') || req.query.auth || req.cookies.auth;
    console.log(req.cookies.auth);
    const user = verify(token, SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    req.error = error;
    next();
  }
}

const protectRoute = (req, res, next) => {
  if (req.error || !req.user) res.status(401).json({ error: req.error });
  else next();
}

module.exports = {
  signIn,
  checkToken,
  protectRoute
}