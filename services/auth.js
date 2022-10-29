const users = require("../model/DBmodel");
const TOKEN_KEYS = require("../config/token_keys");

const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const signup = async (user) => {
    //check username
    const {username, password, roles} = user;
    const duplicate = await users.find({username})
        .catch(error => console.log(error))

    if (duplicate.length !== 0) {
        return "this user already exists";
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
    return accessToken;
}

const login = async (user) => {
    const {username, password} = user;
    const foundedUser = await users.find({username})
        .catch(error => console.log(error))
    if (foundedUser.length === 0) {
        return "this user does not exist";
    }
    const isMatch = await bcrypt.compare(password, foundedUser[0].password);
    if (!isMatch) {
        return "wrong password ";
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

    await users.findOneAndUpdate({username}, {
        refreshToken: refreshToken
    }).then(() => {
        console.log("done")
    })
    console.log(accessToken);
    return accessToken;
}

const refreshToken = async (token) => {
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
        return accessToken;
    } catch (e) {
        return "token invalid";
    }
}

module.exports = {login, signup, refreshToken};