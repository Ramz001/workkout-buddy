const express = require("express");
const workoutRoutes = require("./routes/workouts/workouts.route");
const userRoutes = require("./routes/user/user.route");
const mongoose = require("mongoose");
const cors = require("cors");
const localVariables = require("./middleware/localVariables");
require("dotenv").config();

const corsOptions = {
  origin: [
    `http://localhost:${process.env.PORT}`,
    "https://mr-workout-buddy.vercel.app/*",
    "*",
  ],
};

const app = express();
const MONGODB_URI = process.env.MONGODB_URI ?? "";

app.use(express.json(corsOptions));
app.use(cors());
app.locals.OTP = null;

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
app.use(localVariables);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, (req, res) => {
      console.log(
        `App is listening on port ${process.env.PORT} ${process.pid}`
      );
    });
  })
  .catch((error) => console.log(error));

module.exports = app;
