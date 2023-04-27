const { default: mongoose } = require("mongoose");
const Admin = require("../model/Admin");
const Poll = require("../model/poll");

const createPoll = async (req, res) => {
  const { name } = req.body;
  const { admin } = req.params.Id;

  if (!name) return res.status(400).json({ message: "Poll name is required" });

  let existingAdmin;

  try {
    existingAdmin = await Admin.findById(admin);
  } catch (err) {
    return res.status(400).json({ message: "Admin not found" });
  }

  const duplicate = await Poll.findOne({
    name: name,
  }).exec();
  if (duplicate) {
    return res.status(409).json({
      message:
        "Poll name most be unique, please include acadamic year on every new poll",
    });
  } else {
    try {
      const result = await Poll.create({
        name: name,
        admin: existingAdmin,
      });
      res.status(201).json({ sucess: "New poll created" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

const updatePoll = async (req, res, next) => {
  const { name } = req.body;
  const { Id } = req.params.Id;

  if (!name) {
    return res.status(400).json({ message: "All admin detials  are required" });
  }

  try {
    const updatedAdmin = await Poll.findOneAndUpdate(
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

const getPollById = async (req, res) => {
  const Id = req?.params?.id;
  if (!Id) return res.status(400);
  const poll = await Poll.findById(Id);
  if (!poll) {
    return res.status(404);
  }
  res.status(200).json(poll);
};

const getAllPolls = async (req, res) => {
  const poll = await Poll.find();
  if (!poll) return res.status(204).json({ message: "No admin present" });
  res.json(poll);
};

module.exports = {
  getAllPolls,
  createPoll,
  updatePoll,
  getPollById,
};
