const TOKEN_KEYS = require("../config/token_keys");
const users = require("../model/DBmodel");
const {signup, login} = require("../services/auth");

const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const {validationResult} = require("express-validator");

const signupController = async (req, res) => {
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const result = await signup(req.body);
    res.send(result);
}
module.exports = signupController;