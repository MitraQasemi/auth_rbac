const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");

const loader = async (app) => {
    await mongooseLoader();
    console.log("connected to mongoose");

    await expressLoader(app);
    console.log("express loaded");

}

module.exports = loader;