const express = require('express');

const MongooseHelper = require('../helpers/mongooseHelper');
const cryptoHelper = require('../helpers/cryptoHelper');
const JwtHelper = require('../helpers/jwtHelper');

const app = express();
// const helper = new MongooseHelper();

app.get('/getall', async (req,res) => {
    try{
        const users = await MongooseHelper.users_toList();
        res.json(users);
    } catch (ex){
        res.json('err');
    }
    res.end();
})

app.get('/deleteall',(req,res) => {
    MongooseHelper.users_removeAll();
    res.json('deleted');
    res.end();
})

app.post('/signup', async (req,res) => {
    const body = req.body;
    const email = '' + body.email;
    const fullname = body.fullname;
    const password = body.password;

    try{
        const sameEmail = await MongooseHelper.users_findByEmail(email.toLowerCase());
        if(sameEmail != null){
            console.log(sameEmail);
            res.json("SAME_EMAIL");
            res.end();
        } else {
            // encrypting the password
            const _password = cryptoHelper.encryptText(password);
            // creating user
            const userId = await MongooseHelper.users_insert(fullname,email,_password);
            // add json web token
            const token = await JwtHelper.generateToken(userId);

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

app.post('/login', async (req,res) => {
    const body = req.body;
    const email = '' + body.email;
    const password = body.password;
    // console.log(body + '\n' + email + ' ' + password);
    try{
        // find the enctrypted password
        const _password = cryptoHelper.encryptText(password);
        // find user in database
        const user = await MongooseHelper.users_login(email,_password);
        if(user != null){
            // generate jwt token
            const token = await JwtHelper.generateToken(user._id);
            
            res.json({
                userId: user._id,
                token: token,
            });
            res.end();
        } else {
            res.json("NOTFOUND");
            res.end();
        }
        // console.log(_password);
        // res.end();
    } catch(ex){
            console.log(ex);
            res.json(ex);
        res.end();
    }
})

module.exports = app;