const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const req = require("express/lib/request");
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please Provide valid e-mail",
    ],
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: [true, "Please provide a password"],
    minlength: [6, "Please provide a password with min length 6"],
  },
  articles: Array,
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(console.log("Error genSalt ...."));
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) next(console.log("Error Hash..."));
      this.password = hash;
      next();
    });
  });
});

UserSchema.methods.generateJWTFromUser = function () {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
  const payload = {
    id: this._id,
    name: this.name,
  };
  const token = jsonwebtoken.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE,
  });
  return token;
};

module.exports = mongoose.model("Users", UserSchema);
