const express = require("express");
const app = express();
require("./Models/db");
const AuthRouter = require("./Routers/AuthRouter");

const bodyParser = require("body-parser");
const cors = require("cors");

const conectDB = require("./Models/db.js");
conectDB();

app.get("/ping", (req, res) => {
  res.send("PONG");
});
app.use(bodyParser.json());
app.use(cors());
//request allow to server---------------

//router--------------------------
app.use("/auth", AuthRouter);

app.listen(8000, () => {
  console.log(`server is running on port 8000`);
});
