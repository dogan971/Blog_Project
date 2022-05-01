const bcrypt = require("bcrypt");

const comparePassword = (password, hashedpassword) => {
  return bcrypt.compareSync(password, hashedpassword);
};

const validateUserInput = (email, password) => {
  return email && password;
};
module.exports = {
  comparePassword,
  validateUserInput,
};
