const {userModel, productModel} = require("../model/DBmodel");
const TOKEN_KEYS = require("../config/token_keys");

const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const signup = async (user) => {
    try {
        //check username
        const {username, password, roles, addresses} = user;
        const duplicate = await userModel.find({username})
            .catch(error => console.log(error))

        if (duplicate.length !== 0) {
            return "this user already exists";
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //create tokens
        const rolesArray = Object.values(roles);
        const accessToken = JWT.sign({
                username,
                roles: rolesArray
            }, TOKEN_KEYS.access
            , {expiresIn: 3600000})
        const refreshToken = JWT.sign({
                username,
            }, TOKEN_KEYS.refresh
            , {expiresIn: 3600000 * 1000})
        await userModel.create({
            username,
            password: hashedPassword,
            roles,
            refreshToken,
            addresses
        })
        return accessToken;
    } catch (e) {
        throw e;
    }
}

const login = async (user) => {
    try {
        const {username, password} = user;
        const foundedUser = await userModel.find({username})
            .catch(error => console.log(error))
        if (foundedUser.length === 0) {
            return "this user does not exist";
        }
        const isMatch = await bcrypt.compare(password, foundedUser[0].password);
        if (!isMatch) {
            return "wrong password ";
        }
        const rolesArray = Object.values(foundedUser[0].roles);
        const accessToken = JWT.sign({
                username,
                roles: rolesArray
            }, TOKEN_KEYS.access
            , {expiresIn: 3600000})
        const refreshToken = JWT.sign({
                username,
            }, TOKEN_KEYS.refresh
            , {expiresIn: 3600000 * 1000})

        await userModel.findOneAndUpdate({username}, {
            refreshToken: refreshToken
        })
        return accessToken;
    } catch (e) {
        throw e;
    }
}

const refreshToken = async (token) => {
    try {
        let user = await JWT.verify(token, TOKEN_KEYS.refresh);
        const username = user.username;
        const foundedUser = await userModel.find({username})
            .catch(error => console.log(error))
        const rolesArray = Object.values(foundedUser[0].roles);

        const accessToken = await JWT.sign({
                username,
                roles: rolesArray
            }, TOKEN_KEYS.access
            , {expiresIn: 3600000})
        return accessToken;
    } catch (e) {
        throw e;
    }
}

module.exports = {login, signup, refreshToken};