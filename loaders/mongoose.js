const mongoose = require("mongoose");

const mongooseLoader = async () => {
    await mongoose.connect("mongodb://localhost/DB");
}

module.exports = mongooseLoader;