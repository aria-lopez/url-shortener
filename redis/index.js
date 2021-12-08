require('dotenv').config();
const redis = require('redis');
const { promisify } = require('util');


const defaultOptions = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    keyPrefix: process.env.REDIS_PREFIX || 'url-',
};

class AsyncRedis {
    constructor() {
        // Client setup
        this.client = redis.createClient(defaultOptions);
        this.client.connect();
        this.prefix = defaultOptions.keyPrefix;
        this.client.on('error', (error) => console.log(error));
    }

    async set(key, value) {
        try {
            await this.client.set(key, JSON.stringify(value))
            return 'OK';
        } catch(e) {
            throw new Error(e);
        }
    }

    async get(key) {
        try {  
            const data = await this.client.get(key);
            return JSON.parse(data);
        } catch(e) {
            throw new Error(e);
        }
    }

    async flush() {
        try {
            await this.client.flushDb();
            return 'OK';
        } catch(e) {
            throw new Error(e);
        }
    }
}

module.exports = AsyncRedis;
