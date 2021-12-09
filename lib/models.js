const { Links } = require('../db');
const AsyncRedis = require('../redis');
const redis = new AsyncRedis();

module.exports = {
	createLink: async (redirect_link, short_link, clicks = 0) => {
		try {
			const doc = await Links.create({redirect_link, short_link, clicks});
            await redis.set(short_link, doc);
			return doc;
		} catch (error) {
			throw new Error(error);
		}
	},

	retrieveLink: async (short_link) => {
		try {
            const cached = await redis.get(short_link);
            if (cached) return cached;
			const doc = await Links.find({short_link});
            return doc[0];
		} catch (error) {
			throw new Error(error);
		}
	},

	addClick: async (short_link, clicks) => {
		try {
			await Links.findOneAndUpdate({short_link}, {clicks: clicks + 1});
			return;
		} catch (error) {
			throw new Error(error);
		}
    },

    getLinkById: async (id) => {
        try {
            const link = await Links.findOne({ _id: id });
            return link;
        } catch(err) {
            throw new Error(err);
        }
    }
};
