const checkAuth = require("../middleware/checkAuth.js");
const verifyRoles = require("../middleware/roles.js");
const loginController = require("../controllers/loginController")
const signupController = require("../controllers/signupController")
const refreshTokenController = require("../controllers/refreshTokenController")
const ROLES_LIST = require("../config/roles_list")

const express = require('express');
const router = express.Router();
const {check, validationResult} = require("express-validator");

router.post("/signup", check("password", "please provide a valid password").isLength({min: 6}),signupController)
router.post("/login",loginController)
router.get("/refreshToken",refreshTokenController)

router.get("/test", checkAuth, verifyRoles(ROLES_LIST.admin), (req, res) => {
    res.send(req.roles)
})
module.exports = router;