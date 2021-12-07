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
        this.prefix = defaultOptions.keyPrefix;
        // Error Handling
        this.client.on('error', this.error);
    }

    error(e) {
        throw new Error(e);
    }

    async set(key, value) {
        try {
            const setAsync = promisify(this.client.set).bind(this.client);
            await setAsync(key, JSON.stringify(value));
            return 'OK';
        } catch(e) {
            this.error(e);
        }
    }

    async get(key) {
        try {  
            const getAsync = promisify(this.client.set).bind(this.client);
            const data = await getAsync(key);
            return JSON.parse(data);
        } catch(e) {
            this.error(e);
        }
    }

    async flush() {
        try {
            const flushAsync = promisify(this.client.flushdb).bind(this.client);
            await flushAsync();
            return 'OK';
        } catch(e) {
            this.error(e);
        }
    }
}

module.exports = AsyncRedis;
