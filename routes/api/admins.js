const express = require("express");
const router = express.Router();
const adminController = require("../../controller/adminController");

router.get("/", adminController.getAllAdmins);
router.get("/:id", adminController.getAdminById);
router.patch("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);
module.exports = router;
