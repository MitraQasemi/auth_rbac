const TOKEN_KEYS = require("../config/token_keys");
const users = require("../model/DBmodel");
const {refreshToken, login} = require("../services/auth");

const JWT = require("jsonwebtoken");

const refreshTokenController = async (req, res) => {
    const token = req.header("x-auth-token");
    if (!token) {
        res.send("no token found")
    }

    const result = await refreshToken(req.body);
    res.send(result);
}
module.exports = refreshTokenController;