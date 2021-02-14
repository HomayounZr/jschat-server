const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const privateMessageSchema = new mongoose.Schema ({
    senderId: {
        type: types.ObjectId,
        ref: 'users'
    },
    receiverId: {
        type: types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    isSeen: {
        type: Boolean,
        default: false,
    },
});

const privateMessageModel = mongoose.model('privateMessages',privateMessageSchema);
module.exports = privateMessageModel;