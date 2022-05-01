const expressAsyncHandler = require("express-async-handler");
const User = require("../../models/User");

const checkUserDatabase = expressAsyncHandler(async (req, res, next) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if(!user)
});

module.exports = {
  checkUserDatabase,
};
