const { default: mongoose } = require("mongoose");
const Student = require("../model/student");

const getAllStudents = async (req, res) => {
  const std = await Student.find();
  if (!std) return res.status(204).json({ message: "No student present" });
  res.json(std);
};

const updateStudent = async (req, res, next) => {
  const { username, dob, sex, faculty, department } = req.body;
  const { Id } = req.params.Id;

  if (!username || !dob || !sex || !faculty || !department) {
    return res.status(400).json({ message: "All user detials  are required" });
  }

  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: Id },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({ message: "Student updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteStudent = async (req, res) => {
  const Id = req.params.Id;
  try {
    // Check if student exist
    const std = await Student.findOne({ _id: Id });
    if (!blogPost) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Delete the student
    await Student.deleteOne({ _id: Id });
    res.json({ success: "Student deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

const getStudentById = async (req, res) => {
  const Id = req?.params?.id;
  if (!Id) return res.status(400);
  const std = await Student.findById(Id);
  if (!std) {
    return res.status(404);
  }
  res.status(200).json(std);
};

module.exports = {
  getAllStudents,
  updateStudent,
  deleteStudent,
  getStudentById,
};
