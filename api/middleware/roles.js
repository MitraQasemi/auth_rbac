const {refreshToken} = require("../../services/auth");
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) {
            return res.send("there is no roles");
        }
        try {
            const allowedRolesArray = [...allowedRoles];
            const rolesArray = req.roles;
            let isFounded = allowedRolesArray.some( ai => rolesArray.includes(ai) );
            if (isFounded) next();
            else res.send("not allowed");
        } catch (e) {
            return next(e);
        }
    }
}
module.exports = verifyRoles;