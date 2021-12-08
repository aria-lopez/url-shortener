// Server Dependecies
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const DEFAULT_PORT = process.env.DEFAULT_PORT || 3000;
const bodyParser = require('body-parser');
const router = require('./router.js');
// Cron Jobs
const cron = require('node-cron');
const AsyncRedis = require('../redis');

// Clearing Redis Cache every hour, can make this more verbose but for most use cases this should be fine.
cron.schedule('*/59 * * * *', async () => {
    try {
        console.log('url-shorterner: Flushing Cache');
        const redis = new AsyncRedis();
        await redis.flush();
        console.log('url-shorterner: Flushing Cache complete')
    } catch(e) {
        console.log('url-shorterner: Clearing Cache Error -->')
        console.log(e);
    }
});

// Server setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// API routing
const controllers  = require('./controllers.js');
app.use('/api', router);
app.use('/:hash', controllers.redirectAndUpdate);

app.listen(DEFAULT_PORT, () => console.log(`url-shorterner running @ Port: ${DEFAULT_PORT}`));
