const express = require("express");
const router = express.Router();
const pollController = require("../../controller/pollController");

router.post("/", pollController.createPoll);
router.get("/", pollController.getAllPolls);
router.get("/:id", pollController.getPollById);
router.patch("/:id", pollController.updatePoll);
module.exports = router;
