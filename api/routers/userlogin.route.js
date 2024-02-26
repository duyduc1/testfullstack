const express = require("express")
const router = express.Router()

const userLogin = require("../controllers/userlogin.controller")
router.get("/" , userLogin.getUser)
router.post("/" ,userLogin.postLoginUser)

module.exports = router