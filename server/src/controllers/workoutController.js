const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

const getWorkouts = async (req, res) => {
  const user_id = req.user._id
  try {
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOneWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "This workout does not exist" });
    }

    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ error: "The workout was not found!" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createWorkout = async (req, res) => {
  const { title, repetitions, duration, sets, load } = req.body;
  const user_id = req.user._id
  try {
    const workout = await Workout.create({
      title,
      repetitions,
      duration,
      sets,
      load,
      user_id
    });

    let emptyFields = []

    if(!title){
      emptyFields.push('title')
    }
    if(!repetitions){
      emptyFields.push('repetitions')
    }
    if(!sets){
      emptyFields.push('sets')
    }
    if(emptyFields.length > 0){
      return res.status(400).json({ error: 'Please fill in the missing fields', emptyFields })
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "This workout does not exist" });
    }

    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      return res.status(400).json({ error: "The workout was not found!" });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "This workout does not exist" });
  }

  const workout = await Workout.findByIdAndUpdate(id, { ...req.body });

  if (!workout) {
    return res.status(404).json({ error: "The workout was not found!" });
  }

  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getOneWorkout,
  deleteWorkout,
  updateWorkout,
};
