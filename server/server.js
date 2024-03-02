const express = require("express");
const workoutRoutes = require("./src/routes/workouts");
const userRoutes = require("./src/routes/user");
const mongoose = require("mongoose");

require("dotenv").config({ path: "./src/configs/.env" });

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  next();
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server is on");
    });
  })
  .catch((error) => console.log(error));
