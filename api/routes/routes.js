const roles = require("../middleware/roles");
const checkAuth = require("../middleware/checkAuth");
const {signup, login, refreshToken} = require("../../services/auth");

const {check, validationResult} = require("express-validator");
const express = require("express");
const route = express.Router();

const func = (app) => {
    app.use(route);
    route.post("/signup", check("password", "please provide a valid password").isLength({min: 6}), async (req, res, next) => {
        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        try {
            const result = await signup(req.body);
            return res.send(result);
        } catch (e) {
            return next(e);
        }
    })

    route.post("/login", async (req, res, next) => {
        try {
            const result = await login(req.body);
            return res.send(result);
        } catch (e) {
            return next(e);
        }

    })

    route.get("/refreshToken", async (req, res, next) => {
        const token = req.header("x-auth-token");
        if (!token) {
            res.send("no token found")
        }
        try {
            const result = await refreshToken(token);
            return res.send(result);
        } catch (e) {
            return next(e);
        }

    })
}

module.exports = func;