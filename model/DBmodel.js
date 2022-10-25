const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/DB", () => {
    console.log("coneccted to mongoose");
});

const Schema = mongoose.Schema;
const User = new Schema({
    username: String,
    password: String,
    roles: [],
    refreshToken: String
})
module.exports = mongoose.model('Users', User);