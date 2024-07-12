const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getOneWorkout,
  deleteWorkout,
  updateWorkout,
} = require("./workouts.controller");

const requireAuth = require("../../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getWorkouts);
router.post("/", createWorkout);
router.get("/:id", getOneWorkout);
router.delete("/:id", deleteWorkout);
router.patch("/:id", updateWorkout);

module.exports = router;
