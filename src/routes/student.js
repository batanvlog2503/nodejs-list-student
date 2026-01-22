const express = require("express")
const router = express.Router()
const studentController = require("../app/controllers/StudentControllers")
router.put("/:id", studentController.update)
router.get("/:id/edit", studentController.edit)
router.get("/view", studentController.show)
router.get("/create", studentController.create)
router.post("/add", studentController.add)
module.exports = router
