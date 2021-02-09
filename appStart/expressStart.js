const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const LogHelper = require('../helpers/logHelper');
const app = express();

// connecting to mongodb database with mongoose
mongoose.connect('mongodb://localhost:27017/jschat_test01',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('error', (err) => {
    LogHelper.logError('./appStart/expressStart.js',err);
});
mongoose.connection.on('open', () => {
    console.log('DB Opened');
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// implementing controllers here
const usersCtrl = require('../controllers/usersController');
app.use('/api/users/',usersCtrl);

module.exports = app;