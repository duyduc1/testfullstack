const express = require("express")
const router = express.Router()

const userRegisterRoute = require('../controllers/userregister.controller')
router.post("/" , userRegisterRoute.postRegister)

module.exports = router