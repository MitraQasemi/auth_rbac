const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const User = new Schema({
    username: String,
    password: String,
    roles: [],
    refreshToken: String
})
module.exports = mongoose.model('Users', User);