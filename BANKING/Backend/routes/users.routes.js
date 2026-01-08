const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");

// CRUD routes
router.get("/", controller.getData);
router.post("/", controller.createData);
router.get("/:id", controller.getDataById);
router.put("/:id", controller.updateData);
router.delete("/:id", controller.deleteData);

module.exports = router;
