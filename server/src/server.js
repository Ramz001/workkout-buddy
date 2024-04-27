const express = require("express");
const workoutRoutes = require("./routes/workouts/workouts.route");
const userRoutes = require("./routes/user/user.route");
const mongoose = require("mongoose");
const cors = require("cors");
const localVariables = require('./middleware/localVariables')
require("dotenv").config({ path: "./src/configs/.env" })

const corsOptions = {
  origin: [`http://localhost:${process.env.PORT}` ,"https://mr-workout-buddy.vercel.app/**"], // frontend URI (ReactJS)
}

const app = express();

app.use(express.json(corsOptions));
app.use(cors());
app.locals.OTP = null

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
app.use(localVariables)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, (req, res) => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));

module.exports = app