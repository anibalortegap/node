const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String
});

const modelUser = mongoose.model('User', userSchema);

module.exports = modelUser;