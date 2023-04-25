const express = require("express");
const router = express.Router();
const adminSignupController = require("../controller/adminSignupController");

router.post("/", adminSignupController.createAdmin);
module.exports = router;
