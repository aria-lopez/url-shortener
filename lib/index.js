// Server Dependecies
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const DEFAULT_PORT = process.env.DEFAULT_PORT || 3000;
const bodyParser = require('body-parser');
const router = require('./router.js');

// Server setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// API routing
app.use('/api', router);

app.listen(DEFAULT_PORT, () => console.log(`url-shorterner running @ Port: ${DEFAULT_PORT}`));
