const expressAsyncHandler = require("express-async-handler");
const {
  comparePassword,
  validateUserInput,
} = require("../helpers/inputhelpers");
const { sendJWTToClient } = require("../helpers/tokenHelpers");
const User = require("../models/User");
const register = expressAsyncHandler(async (req, res) => {
  if (req.method == "POST") {
    const { name, email, password } = req.body;
    await User.create({ name, email, password }, function (err, user) {
      if (err) {
        return res
          .status(400)
          .json({ status: 0, message: "User Create Error" });
      }
      return res.redirect("login");
    });
  } else return res.render("register.ejs");
});

const login = expressAsyncHandler(async (req, res, next) => {
  if (req.method == "POST") {
    const { email, password } = req.body;
    if (!validateUserInput(email, password)) {
      return res.send("Errorr Inputs");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!comparePassword(password, user.password)) {
      return res.status(400).json({ status: 0, message: "Password Error" });
    }

    sendJWTToClient(req, res, next, user);
  } else {
    return res.render("login.ejs");
  }
});
module.exports = {
  register,
  login,
};
