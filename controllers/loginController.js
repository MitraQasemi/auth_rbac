const users = require("../model/DBmodel");
const TOKEN_KEYS = require("../config/token_keys");
const {login} = require("../services/auth");

const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const loginController = async (req, res) => {
    const user = req.body;
    res.send(await login(user));
}

module.exports = loginController;