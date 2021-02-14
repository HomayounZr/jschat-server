const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

const encryptText = (text) => {

    // const iv = crypto.randomBytes(16);
    // const cipher = crypto.createCipheriv(
    //     process.env.CRYPTO_ALGORITHM,
    //     process.env.CRYPTO_SECRET,
    //     iv);

    // const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    // return {
    //     iv: iv.toString('hex'),
    //     content: encrypted.toString('hex')
    // };

    const new_text = crypto.createHash('sha256').update(text).digest('hex');
    return new_text;
}

module.exports = {
    encryptText,
}