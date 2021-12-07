require('dotenv').config();

const makeId = (length) => {
    let hash = [];
    const validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charLength = validCharacters.length;
    for (let i = 0; i < length; i++) {
        hash.push(
            validCharacters.charAt(Math.floor(Math.random() * charLength))
        );
    }
    hash = hash.join('');
    return hash;

}

const makeShortLink = async (baseURL, length) => {
    try {
        const id = makeId(length);
        const short_link = `${baseURL}/${id}`;
        const data = await models.retrieveLink(short_link);
        if (!data) return short_link;
        return await makeShortLink();
    } catch(e) {
        throw new Error(e);
    }
}


module.exports = {
    
}
