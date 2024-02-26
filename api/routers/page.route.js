const express = require("express")
const router = express.Router()

const pageRouter = require("../controllers/page.controll")

router.get("/" , pageRouter.getPage)
router.post("/" , pageRouter.postPage)
router.put("/:id" , pageRouter.contentUpdate)
router.delete("/:id" , pageRouter.deleteContent)
router.get("/:id" , pageRouter.searchByCategories)
module.exports = router