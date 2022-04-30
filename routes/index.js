const express = require("express");
const router = express.Router();
const user = require("../routes/user");
const about = require("../routes/about");
const articles = require("../routes/about");

router.use("/user", user);
router.use("/about", about);
router.use("/articles", articles);

module.exports = router;
