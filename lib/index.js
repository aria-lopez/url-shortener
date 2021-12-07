// Server Dependecies
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const DEFAULT_PORT = process.env.DEFAULT_PORT || 3000;
const bodyParser = require('body-parser');

// Server setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(DEFAULT_PORT, () => console.log(`url-shorterner running @ Port: ${DEFAULT_PORT}`));
