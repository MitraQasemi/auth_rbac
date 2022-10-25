const users = require("../model/DBmodel");
const TOKEN_KEYS = require("../config/token_keys");

const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const loginController = async (req, res) => {
    const {username, password} = req.body;
    const foundedUser = await users.find({username})
        .catch(error => console.log(error))
    if (foundedUser.length === 0) {
        res.send("this user does not exist");
        return;
    }
    const isMatch = await bcrypt.compare(password, foundedUser[0].password);
    if (!isMatch) {
        res.send("wrong password ")
    }
    const rolesArray = Object.values(foundedUser[0].roles);
    const accessToken = await JWT.sign({
            username,
            roles: rolesArray
        }, TOKEN_KEYS.access
        , {expiresIn: 3600000})
    const refreshToken = await JWT.sign({
            username,
        }, TOKEN_KEYS.refresh
        , {expiresIn: 3600000 * 1000})

    users.findOneAndUpdate({username}, {
        refreshToken: refreshToken
    }).then(() => {
        console.log("done")
    })
    res.send(accessToken);
}

module.exports = loginController;