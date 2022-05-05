const express = require("express");
const router = express.Router();
const user = require("../routes/user");
const articles = require("../routes/articles");
router.use("/user", user);
router.use("/articles", articles);

module.exports = router;
