const expressAsyncHandler = require("express-async-handler");
const {
  comparePassword,
  validateUserInput,
} = require("../helpers/inputhelpers");
const User = require("../models/User");
const register = expressAsyncHandler(async (req, res) => {
  if (req.method == "POST") {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });
    await sleep(1500);
    return res.render("login.ejs");
  } else return res.render("register.ejs");
});

const login = expressAsyncHandler(async (req, res) => {
  if (req.method == "POST") {
    const { email, password } = req.body;
    if (!validateUserInput(email, password)) {
      return res.render("login.ejs", { status: false });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!comparePassword(password, user.password)) {
      return res.render("login.ejs", { status: false });
    }
    return res.render("login.ejs", { status: true });
  } else {
    return res.render("login.ejs", { status: null });
  }
});
module.exports = {
  register,
  login,
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
