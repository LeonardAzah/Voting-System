const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  participant: [
    { type: mongoose.Types.ObjectId, ref: "Participant", required: true },
  ],

  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("poll", pollSchema);
