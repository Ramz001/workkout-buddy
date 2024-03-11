const express = require("express");
const workoutRoutes = require("./src/routes/workouts");
const userRoutes = require("./src/routes/user");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config({ path: "./src/configs/.env" });

const corsOptions = {
  origin: process.env.CLIENT_URL // frontend URI (ReactJS)
}

const app = express();

app.use(express.json());
app.use(cors(corsOptions));


app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
