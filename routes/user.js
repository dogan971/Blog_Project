const express = require("express");
const router = express.Router();
const { register,login } = require("../controller/user");
router.get("/register", register).post("/register", register);
router.get("/login",login).post("/login",login)

module.exports = router;

//   // static
//   const rootdir = path.dirname(require.main.filename);
//   res.sendFile(path.join(rootdir, "/public/views/index.html"));
