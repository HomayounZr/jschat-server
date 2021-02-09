const express = require('express');

const MongooseHelper = require('../helpers/mongooseHelper');
const cryptoHelper = require('../helpers/cryptoHelper');
const JwtHelper = require('../helpers/jwtHelper');

const app = express();
// const helper = new MongooseHelper();

app.get('/getall', (req,res) => {
    try{
        const users = MongooseHelper.users_toList();
        res.json(users);
    } catch (ex){
        res.json('err');
    }
    res.end();
})

app.post('/singup', (req,res) => {
    const body = req.body;
    const email = '' + body.email;
    const fullname = body.fullname;
    const password = body.password;

    try{
        const sameEmail = MongooseHelper.users_findByEmail(email.toLowerCase());
        if(sameEmail != null){
            res.json("SAME_EMAIL");
            res.end();
        } else {
            
            // encrypting the password
            const _password = cryptoHelper.encryptText(password);

            // creating user
            const userId = MongooseHelper.users_insert(fullname,email,_password);

            // add json web token
            const token = JwtHelper.generateToken(userId);

            res.json({
                userId: userId,
                token: token
            });
            res.end();

        }
    } catch(ex){
        res.json(ex);
        res.end();
    }
});

app.post('/login', (req,res) => {
    const body = req.body;
    const email = '' + body.email;
    const password = body.password;

    try{
        // find the enctrypted password
        const _password = cryptoHelper.encryptText(password);
        // find user in database
        const user = MongooseHelper.users_checkLogin()
    } catch(ex){
        res.json(ex);
        res.end();
    }
})

module.exports = app;