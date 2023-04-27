const { default: mongoose } = require("mongoose");
const Participant = require("../model/participant");
const Poll = require("../model/poll");

const createParticipant = async (req, res) => {
  const { username, matricule, faculty, department, image, bio } = req.body;
  const { poll } = req.params.Id;

  if (!username || !faculty || !department || !matricule || !image || !bio)
    return res
      .status(400)
      .json({ message: "All student  details are required" });

  const duplicate = await Poll.findOne({
    matricule: matricule,
  }).exec();
  if (duplicate) {
    return res.status(409).json({
      message: "Student already exist",
    });
  } else {
    try {
      const result = await Participant.create({
        username: username,
        matricule: matricule,
        faculty: faculty,
        department: department,
        bio: bio,
        image: image,
        poll: poll,
      });
      res.status(201).json({ sucess: "New participant created" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

const getAllByPollId = async (req, res) => {
  const pollId = req?.params?.id;
  if (!pollId) return res.status(400);
  try {
    const poll = await Participant.findById(Id);
  } catch (err) {
    return res.status(400).json({ message: "Poll not found" });
  }
  const participants = await Participant.find({ class: pollId });
  if (!participants) return [];
  res.json(admin);
};

const updatePaticipant = async (req, res, next) => {
  const { username, matricule, faculty, department, image, bio } = req.body;
  const { Id } = req.params.Id;

  if (!username || !faculty || !department || !matricule || !image || !bio)
    return res
      .status(400)
      .json({ message: "All student  details are required" });

  try {
    const updatedParticipant = await Participant.findOneAndUpdate(
      { _id: Id },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({ message: "Updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteParticipant = async (req, res) => {
  const Id = req.params.Id;
  try {
    // Check if admin exist
    const admin = await Participant.findOne({ _id: Id });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Delete the student
    await Participant.deleteOne({ _id: Id });
    res.json({ success: "Admin deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createParticipant,
  getAllByPollId,
  updatePaticipant,
  deleteParticipant,
};
