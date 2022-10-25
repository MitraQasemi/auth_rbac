const TOKEN_KEYS = require("../config/token_keys");
const users = require("../model/DBmodel");

const JWT = require("jsonwebtoken");

const refreshTokenController = async (req, res) => {
    const token = req.header("x-auth-token");

    if (!token) {
        res.send("no token found")
    }

    try {
        let user = await JWT.verify(token, TOKEN_KEYS.refresh);
        const username = user.username;
        const foundedUser = await users.find({username})
            .catch(error => console.log(error))
        const rolesArray = Object.values(foundedUser[0].roles);

        const accessToken = await JWT.sign({
                username,
                roles: rolesArray
            }, TOKEN_KEYS.access
            , {expiresIn: 3600000})
        res.send(accessToken);
    } catch (e) {
        res.send("token invalid")
    }
}
module.exports = refreshTokenController;