const express = require("express");
const workoutRoutes = require("./src/routes/workouts");
const userRoutes = require("./src/routes/user");
const mongoose = require("mongoose");
const cors = require("cors");
const localVariables = require('./src/middleware/localVariables')
require("dotenv").config({ path: "./src/configs/.env" });

const corsOptions = {
  origin: [process.env.CLIENT_URL, "https://workout-buddy-self.vercel.app"], // frontend URI (ReactJS)
  methods: ["POST", "GET", "PATCH", "DELETE"],
}

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.locals.OTP = null

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
app.use(localVariables)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
