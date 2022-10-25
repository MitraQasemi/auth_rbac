const TOKEN_KEYS = require("../config/token_keys");
const users = require("../model/DBmodel");

const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const {validationResult} = require("express-validator")

const signupController = async (req, res) => {
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    //check username
    const {username, password, roles} = req.body;
    const duplicate = await users.find({username})
        .catch(error => console.log(error))

    if (duplicate.length !== 0) {
        res.send("this user already exists");
        return;
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create tokens
    const rolesArray = Object.values(roles);
    const accessToken = await JWT.sign({
            username,
            roles: rolesArray
        }, TOKEN_KEYS.access
        , {expiresIn: 3600000})
    const refreshToken = await JWT.sign({
            username,
        }, TOKEN_KEYS.refresh
        , {expiresIn: 3600000 * 1000})
    await users.create({
        username,
        password: hashedPassword,
        roles,
        refreshToken
    })
    res.send(accessToken);
}
module.exports = signupController;