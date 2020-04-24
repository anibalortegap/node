const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    users: [
        {
            type: Schema.ObjectId,
            ref: 'User'
        }
    ]
});

const modelChat = mongoose.model('Chat', chatSchema);

module.exports = modelChat;