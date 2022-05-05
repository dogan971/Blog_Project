const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controller/user");
router.get("/register", register).post("/register", register);
router.get("/login", login).post("/login", login);
router.get("/logout",logout)
module.exports = router;
