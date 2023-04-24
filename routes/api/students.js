const express = require("express");
const router = express.Router();
const studentController = require("../../controller/studentController");

router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.patch("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);
module.exports = router;
