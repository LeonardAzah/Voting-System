const express = require("express");
const router = express.Router();
const participantController = require("../../controller/participantController");

router.post("/", participantController.createParticipant);
router.get("/:id", participantController.getAllByPollId);
router.patch("/:id", participantController.updatePaticipant);
router.delete("/:id", participantController.deleteParticipant);

module.exports = router;
