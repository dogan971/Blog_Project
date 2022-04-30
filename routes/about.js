const express = require("express");
const router = express.Router();
const path = require("path")
router.get("/", (req, res) => {
  const rootdir = path.dirname(require.main.filename);
  res.sendFile(path.join(rootdir, "/public/views/about.html"));
});

module.exports = router;
