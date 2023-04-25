const express = require("express");
const router = express.Router();
const adminSigninController = require("../controller/adminSigninController");

router.post("/", adminSigninController.adminLogin);

module.exports = router;
