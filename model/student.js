const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  matricule: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  faculty: {
    type: String,
    enum: [
      "advance school of translators and interpreters",
      "college of technology",
      "agriculture and veterinary medicine",
      "arts",
      "education",
      "engineering and technology",
      "health sciences",
      "laws and political science",
      "science",
      "social and management sciences",
      "higher technical teachets training college",
      "system management",
    ],
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, default: "student" },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  refreshtoken: String,
});

module.exports = mongoose.model("Student", studentSchema);
