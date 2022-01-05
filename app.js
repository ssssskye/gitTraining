const express = require('express');
const router = require('./apiRouter');
const app = express();

app.use(router);

module.exports = app;