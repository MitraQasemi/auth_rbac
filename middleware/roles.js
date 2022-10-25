const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) {
            return res.send("there is no roles")
        }
        const allowedRolesArray = [...allowedRoles];
        const rolesArray = Object.values(req.roles[0]);
        let isFounded = allowedRolesArray.some( ai => rolesArray.includes(ai) );
        if (isFounded) next();
        else res.send("not allowed")
    }
}
module.exports = verifyRoles;