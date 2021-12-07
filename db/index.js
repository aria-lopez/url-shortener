require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION_URL || 'mongodb://localhost/url-shortener');

const linkSchema = new mongoose.Schema({
	redirect_link: String,
	short_link: String,
	clicks: Number
});

const userSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	links: []
});

const Links = mongoose.model('Links', linkSchema);
const Users = mongoose.model('Users', userSchema);

module.exports = {Links, Users};
