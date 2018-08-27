const express = require('express');
const bodyParser = require('body-parser');
const routers = require('../routes');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', routers);

module.exports = app;
