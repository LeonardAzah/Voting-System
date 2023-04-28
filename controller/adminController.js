const { default: mongoose } = require("mongoose");
const Admin = require("../model/Admin");

const getAllAdmins = async (req, res) => {
  const admin = await Admin.find();
  if (!admin) return res.status(204).json({ message: "No admin present" });
  res.json(admin);
};

const updateAdmin = async (req, res, next) => {
  const { username, dob, sex, faculty, department } = req.body;
  const { Id } = req.params.Id;

  if (!username || !dob || !sex || !faculty || !department) {
    return res.status(400).json({ message: "All admin detials  are required" });
  }

  try {
    const updatedAdmin = await Admin.findOneAndUpdate(
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

const deleteAdmin = async (req, res) => {
  const Id = req.params.Id;
  try {
    // Check if admin exist
    const admin = await Admin.findOne({ _id: Id });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    } else {
      // Delete the student
      await Admin.deleteOne({ _id: Id });
      res.json({ success: "Admin deleted successfully" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

const getAdminById = async (req, res) => {
  const Id = req?.params?.id;
  if (!Id) return res.status(400);
  const admin = await Admin.findById(Id);
  if (!admin) {
    return res.status(404);
  }
  res.status(200).json(admin);
};

module.exports = {
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
  getAdminById,
};
