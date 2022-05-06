const express = require("express");
const router = express.Router();
const { register, login, logout, dashboard } = require("../controller/user");
router.get("/register", register).post("/register", register);
router.get("/login", login).post("/login", login);
router.get("/logout",logout)
router.get("/dashboard",dashboard)
module.exports = router;
