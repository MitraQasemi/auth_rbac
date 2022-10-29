const TOKEN_KEYS = require("../config/token_keys");
const users = require("../model/DBmodel");
const {refreshToken} = require("../services/auth");

const JWT = require("jsonwebtoken");

const refreshTokenController = async (req, res) => {
    const token = req.header("x-auth-token");
    if (!token) {
        res.send("no token found")
    }

    res.send(await refreshToken(token));
}
module.exports = refreshTokenController;