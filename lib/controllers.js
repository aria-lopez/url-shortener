require('dotenv').config();
const models = require('./models');
const validUrl = require('valid-url');

// Link Creation Utils
const makeId = (length) => {
    let hash = [];
    const validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        hash.push(
            validCharacters.charAt(Math.floor(Math.random() * validCharacters.length))
        );
    }
    hash = hash.join('');
    return hash;
}

const makeShortLink = async (length) => {
    try {
        const id = makeId(length);
        const shortLink = `${process.env.BASE_URL}/${id}`;
        const data = await models.retrieveLink(shortLink);
        if (!data) return shortLink;
        return await makeShortLink();
    } catch(e) {
        throw new Error(e);
    }
}

const formatRedirectLink = (link) => {
    let newLink = link;
    if (!link.includes('https://') && !link.includes('http://')) {
        newLink = 'http://' + link; // Need to fix this, hard to distinguish between https and http.
    }
    return newLink;
}

const validateCreateLinkBody = (requestBody) => {
    const redirectLink = requestBody?.redirect_link;
    const idLength = requestBody?.id_length;

    if (!redirectLink || typeof redirectLink !== 'string') return false;

    const link = formatRedirectLink(redirectLink);
    if (!validUrl.isUri(link)) return false;

    if (!idLength || typeof idLength !== 'number' || idLength < 3) return false;

    return true;
}

// Retrieve Link Utils
const validateRetrieveLinkBody = (requestBody) => {
    const shortLink = requestBody?.short_link;
    if (!shortLink || typeof shortLink !== 'string') return false;
    if (shortLink?.length === 0) return false;
    return true;
}


module.exports = {
    createLink: async (req, res) => {
        try {
            // Request handling
            const validRequest = validateCreateLinkBody(req.body);
            if (!validRequest) {
                const error = { error: 'Request requires a redirect_link<String> that is also a valid URL'};
                return res.status(400).send(error);
            }
            const { redirect_link, id_length } = req.body;
            const formattedLink = formatRedirectLink(redirect_link);
            const shortLink = await makeShortLink(id_length);
            const doc = await models.createLink(formattedLink, shortLink);
            res.status(201).send(doc);
        } catch(e) {
            console.log(e);
            res.status(500);
        }
    },

    retrieveLink: async (req, res) => {
        try {
            const validRequest = validateRetrieveLinkBody(req.body);
            if (!validRequest) {
                const error = { error: 'Request requires a short_link<String>' };
                return res.status(400).send(error);
            }

            const { short_link } = req.body;
            const data = await models.retrieveLink(short_link);
            if (!data) {
                const error = { error: 'Request failed, there is no link associated with that short url.'};
                return res.status(400).send(error);
            }
            res.status(200).send(data);
        } catch(e) {
            console.log(e);
            res.status(500);
        }
    },

    redirectAndUpdate: async (req, res) => {
        try {
            const { hash } = req.params;
            const short_link = `${process.env.BASE_URL}/${hash}`;
            const data = await models.retrieveLink(short_link);
            if (!data) {
                const error = { error: 'Request failed, there is no short link with that hash in the database' };
                return res.status(400).send(error);
            }

            const { redirect_link, clicks } = data;
            await models.addClick(short_link, clicks);
            res.redirect(redirect_link);
        } catch(e) {
            console.log(e);
            res.status(500);
        }
    }
}
