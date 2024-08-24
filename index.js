import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { compare } from "bcrypt";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import csvjson from "csvtojson";
import xlsx from "xlsx";

// const xlsx = require('xlsx');

import { fileURLToPath } from "url";

// import userController from "./Controllers/userController";

// const multer = require("multer");
// const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Create __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//declare the path --------------------

app.use(express.static(path.resolve(__dirname, "public")));

//multer------------------------------------------------------------------------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//controllers method ------------------------------------------
// const userController = require("./Controllers/userController");

app.post("/importUser", upload.single("file"), async (req, res) => {
  try {
    // jo file save(upload) huyi hai ..usme se data lena hai --------------------------
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let xlFile = xlsx.readFile(file.path, {
      type: "binary",
      cellDates: true,
      cellNF: false,
      cellText: false,
    });

    let sheet = xlFile.Sheets[xlFile.SheetNames[0]];

    let xl_json = xlsx.utils.sheet_to_json(sheet, {
      raw: false, // This will keep the dates as JavaScript Date objects
    });
    console.log(xl_json);

    // {
    //   'Sr.No ': '76',
    //   'Name ': 'Sharvan  Vaishnav',
    //   'Mobile  Number': '9950891784',
    //   'DOB ': '10/8/00',
    //   'Qualification ': '10th',
    //   'Email Id ': 'sharavanvaishanav830@gmail.com',
    //   'Intrested  ': 'Yes ',
    //   'Remark ': 'SMG ST'
    // },

    const Tabledata = xl_json.map((data) => {
      return {
        fullname: data["Name "],
        mobileNum: data["Mobile  Number"],
        altmobileNum: data["Alt Number "],
        dob: data["DOB "],
        qualification: data["Qualification "],
        email: data["Email Id "],
        intrested: data["Intrested  "],
        remark: data["Remark "],
      };
    });
    console.log(Tabledata);

    const result = await Employee.insertMany(Tabledata);
    console.log("--------------------------", result);

    res.send({ status: 200, success: true, msg: "CSV Imported!!", result });
  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
});

// const bodyParser = require("body-parser");
app.use(bodyParser.json());

//HeymongoDB123
//ny8866428
//pZn05KNItGGTcFpr
// mongodb://127.0.0.1:27017/mydash

const url = "mongodb://127.0.0.1:27017/mydash";
// "mongodb+srv://ny8866428:HeymongoDB123@cluster0.9ukqgml.mongodb.net/mydash";

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

// for data  schema --------------------------------------------

const Employeeschema = new mongoose.Schema({
  fullname: String,
  mobileNum: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please fill a valid mobile number"], // 10-digit number validation
  },
  altmobileNum: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please fill a valid mobile number"], // 10-digit number valida
  },
  dob: {
    type: String,
    required: true,
  },
  qualification: String,
  email: String,
  intrested: String,
  remark: String,
});
const Employee = new mongoose.model("Employee", Employeeschema);

// Router--------------------

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    //check if the user already exists---------------
    const user = await User.findOne({ email: email });

    if (user) {
      if (password === user.password) {
        res.send({ message: "Login SuccessFull", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  const { fullname, email, password, conformedPas } = req.body;
  console.log(fullname, email, password, conformedPas);

  //validation----------------------------------------------------

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

// for data ----------------------------------------

app.get("/printdata", async (req, res) => {
  try {
    const user = await User.find({});
    if (!user) {
      /* res.status(400).json({ message: "user data not found" }); */
    }
    console.log(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// fullname,
// email,
// mobileNum,
// qualification,
// intrested,
// remark,
// dob,

app.post("/create-employee", async (req, res) => {
  try {
    const {
      fullname,
      email,
      mobileNum,
      altmobileNum,
      qualification,
      intrested,
      remark,
      dob,
    } = req.body;
    if (
      !fullname ||
      !email ||
      !mobileNum ||
      !altmobileNum ||
      !dob ||
      !qualification ||
      !intrested ||
      !remark
    ) {
      return res.status(401).json({ message: "ALl field are required!!" });
    }
    const emp = await Employee.findOne({ email: email });
    /* console.log(emp); */
    if (emp) {
      return res.status(200).json({ message: "employee allready created!!!" });
    }
    //create --------
    const employ = await Employee.create({
      fullname,
      mobileNum,
      altmobileNum,
      dob,
      qualification,
      email,
      intrested,
      remark,
    });

    const emplSAVE = await employ.save();
    /*   console.log(emplSAVE); */
    if (emplSAVE) {
      res.status(200).json({ message: "Employee created!!" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
});

// get method for create-employeee------------------------

app.get("/get-employee", async (req, res) => {
  try {
    const employees = await Employee.find({});
    if (!employees) {
      res.send(400).json({ message: "Employees data not found" });
    }

    // send the employee data with a 200 status

    res
      .status(200)
      .json({ message: "Employess data found successfuly!!", employees });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error!!!" });
  }
});

app.listen(9002, () => {
  console.log("BE started at Port 9002");
});
