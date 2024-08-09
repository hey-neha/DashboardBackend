// const express = require("express");
// const app = express();
// require("./Models/db");
// const AuthRouter = require("./Routers/AuthRouter");

// const bodyParser = require("body-parser");
// const cors = require("cors");

// const conectDB = require("./Models/db.js");
// conectDB();

// app.get("/ping", (req, res) => {
//   res.send("PONG");
// });
// app.use(bodyParser.json());
// app.use(cors());
// //request allow to server---------------

// //router--------------------------
// app.use("/auth", AuthRouter);

// app.listen(8000, () => {
//   console.log(`server is running on port 8000`);
// });

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//nehayadav9450242664
//4I17iqlXyCiHoRJD
//mongodb+srv://<username>:<password>@cluster0.9ukqgml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const url =
  "mongodb+srv://manishdevloop:NIQi8aawFUjYsuSp@cluster0.mleqmvq.mongodb.net ";

const connectDB = async () => {
  try {
    await mongoose.connect(url, {});
    console.log("MONGODB connected!!!!");
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
  }
};
connectDB();

// schema-----------------------------------

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  conformedPas: String,
});
const User = new mongoose.model("User", userSchema);

// Router--------------------

app.post("/register", async (req, res) => {
  const { fullname, email, password, conformedPas } = req.body;

  try {
    //check if the user already exists---------------
    const user = await User.findOne({ email: email });

    if (user) {
      res.send({ message: "User already registerd!!!" });
    } else {
      /* const NewUser = new User({
        fullname: fullname,
        email: email,
        password: password,
        conformedPas: conformedPas,
      }); */

      //user create kr rhe hai ...mondoDB ka ---------
      const user = await User.create({
        fullname,
        email,
        password,
        conformedPas,
      });

      //save the user to the database------
      await user.save();
      res.send({ message: "successfully registered!!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.listen(9002, () => {
  console.log("BE started at Port 9002");
});
