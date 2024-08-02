const router = require("express").Router();
const { signup } = require("../Controllers/AuthControllers");
const { signupValidation } = require("../Middlewares/AuthValidation");

router.post("/login", (req, res) => {
  res.send("login success");
});

router.post("/signup", signupValidation, signup);

module.exports = router;
