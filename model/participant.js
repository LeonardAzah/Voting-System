const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participantSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  matricule: {
    type: String,
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
  bio: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  poll: {
    type: mongoose.Types.ObjectId,
    ref: "Poll",
    required: true,
  },

  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("participant", participantSchema);
