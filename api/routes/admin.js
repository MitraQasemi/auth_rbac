const roles = require("../middleware/roles");
const checkAuth = require("../middleware/checkAuth");
const {addProduct, showProducts, getById, deleteBYId, updateById} = require("../../services/adminServices");

const express = require("express");

const route = express.Router();

const func = (app) => {
    app.use(route);
    route.post("/product", checkAuth, roles(1), async (req, res, next) => {
        try {
            const result = await addProduct(req.body);
            return res.send(result);
        } catch (e) {
            return next(e);
        }
    })
    route.get("/product", checkAuth, roles(2), async (req, res, next) => {
        try {
            const result = await showProducts(req.body);
            return res.send(result);
        } catch (e) {
            return next(e);
        }
    })
    route.get("/product/:id", checkAuth, roles(2), async (req, res, next) => {
        try {
            const result = await getById(req.params.id);
            return res.send(result);
        } catch (e) {
            return next(e);
        }
    })
    route.delete("/product/:id", checkAuth, roles(2), async (req, res, next) => {
        try {
            const result = await deleteBYId(req.params.id);
            return res.send(result);
        } catch (e) {
            return next(e);
        }
    })
    route.put("product/:id", checkAuth, roles(2), async (req, res, next) => {
        try {
            const result = await updateById(req.params.id, req.body);
            return res.send(result);
        } catch (e) {
            return next(e);
        }
    })
}

module.exports = func;