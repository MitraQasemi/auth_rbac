const TOKEN_KEYS = require("../config/token_keys");

const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        res.send("no token found")
    }
    try {
        let user = await JWT.verify(token, TOKEN_KEYS.access);
        req.user = user.username;
        req.roles = user.roles;
        console.log(req.user)
        next();
    } catch (e) {
        res.send("token invalid")
    }
}