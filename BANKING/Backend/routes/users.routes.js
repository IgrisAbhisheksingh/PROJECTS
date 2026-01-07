const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");
const usersSchema = require("../model/user.model");

router.post("/", (req, res) => {
  return controller.createData(req, res, usersSchema);
});

module.exports = router;
