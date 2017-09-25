const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const commonRoutes = require('./routes/common.routes');
const protectedRoutes = require('./routes/protected.routes');
const { checkToken } = require('./controllers/auth.controller');
const { handle404NotFound } = require('./controllers/error.controller');

const app = express();

app.set('view engine', 'ejs');

//include all middlewares
app.use(express.static(process.cwd() + '/frontend', { index: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkToken);
app.use(commonRoutes);
app.use(protectedRoutes);
app.use(handle404NotFound);

module.exports = app;