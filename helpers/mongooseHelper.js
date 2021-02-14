const {
    userModel,
    privateMessageModel,
} = require('../models/mongooseModels');
const LogHelper = require('./logHelper');

const path = './helpers/mongooseHelper.js->';

class MongooseHelper {

    static users_toList = () => {
        return new Promise((resolve, reject) => {
            userModel.find({}, (err,users) => {
                if(!err){
                    resolve(users);
                } else {
                    LogHelper.logError(path + 'users_toList()',err);
                    reject(err);
                }
            })
        })
    }

    static users_findByEmail = (email) => {
        return new Promise((resovle, reject) => {
            userModel.findOne({ email: email }, (err,user) => {
                if(!err){
                    resovle(user);
                } else {
                    LogHelper.logError(path + 'users_findByEmail()',err);
                    reject(err);
                }
            });
        });
    }

    static users_insert = (fullname,email,password) => {
        return new Promise((resolve, reject) => {
            let newUser = new userModel({
                fullname: fullname,
                email: email,
                password: password
            });
            newUser.save((err) => {
                if(!err){
                    // return the id
                    resolve(newUser._id);
                } else {
                    LogHelper.logError(path + 'users_insert()',err);
                    reject(err);
                }
            });
        });
    }

    static users_login = (email, password) => {
        return new Promise((resolve, reject) => {
            userModel.findOne({
                email: email,
                password: password
            }, (err, user) => {
                if(!err){
                    resolve(user);
                } else {
                    LogHelper.logError(path + 'users_login()',err);
                    reject(err);
                }
            });
        });
    }

    static users_removeAll(){
        userModel.deleteMany({}, (err) => {
            if(err){
                console.log('err');
            }
        });
    }
}

// const mongooseHelper = new MongooseHelper();
module.exports = MongooseHelper;