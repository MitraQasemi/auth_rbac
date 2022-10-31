const routes = require("./routes/routes");

const express = require("express");

const api = () => {
    const router = express.Router();
    routes(router);
    return router;
}
module.exports = api;

