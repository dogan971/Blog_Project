const express = require("express");
const router = express.Router();
const { register, addUser } = require("../controller/user");
router.get("/register", register);
router.post("/register", addUser);

module.exports = router;

//   // static
//   const rootdir = path.dirname(require.main.filename);
//   res.sendFile(path.join(rootdir, "/public/views/index.html"));
