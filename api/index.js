const routes = require("./routes/routes");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

const express = require("express");

const api = () => {
    const router = express.Router();
    routes(router);
    adminRoutes(router);
    userRoutes(router);
    return router;
}
module.exports = api;

