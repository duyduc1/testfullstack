const express = require("express")
const router = express.Router()

const profileController = require("../controllers/profile.controller")
router.get("/" ,profileController.getUser)
// router.put("/:id" , profileController.updateUserData)

module.exports = router