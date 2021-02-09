const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const LogHelper = require('./logHelper');

const SECRET = process.env.JWT_SECRET;
const path = './helpers/jwtHelper.js->';

class JwtHelper {

    static generateToken = (userId) => {
        return new Promise((resolve, reject) => {
            jwt.sign({ userId: userId },SECRET,(err, token) => {
                if(!err){
                    resolve(token);
                } else {
                    LogHelper.logError(path + 'generateToken()', err);
                    reject(err);
                }
            })
        });
    }

}

module.exports = JwtHelper;