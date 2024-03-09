const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    repetitions: {
      type: Number,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
    },
    user_id: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
