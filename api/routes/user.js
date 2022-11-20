const roles = require("../middleware/roles");
const checkAuth = require("../middleware/checkAuth");
const {order, showCart} = require("../../services/userServices");

const express = require("express");

const route = express.Router();

const func = (app) => {
    app.use(route);
    route.get("/order/:userId/:productId", checkAuth, roles(2), async (req, res, next) => {
        try {
            const result = await order(req.params.userId, req.params.productId);
            return res.send(result);
        } catch (e) {
            return next(e);
        }
    })

    route.get("/showCart/:userId", checkAuth, roles(2), async (req, res, next) => {
        try {
            const result = await showCart(req.params.userId);
            return res.send(result);
        } catch (e) {
            return next(e);
        }
    })

}

module.exports = func;