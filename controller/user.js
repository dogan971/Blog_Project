const expressAsyncHandler = require("express-async-handler");
const path = require("path");
const User = require("../models/User");
const register = (req, res) => {
  const rootdir = path.dirname(require.main.filename);
  const pathdir = path.join(rootdir, "/public/views/register.html");
  res.sendFile(pathdir);
};
const addUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  await sleep(1500);
  return res.redirect("/");
});
module.exports = {
  register,
  addUser,
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
