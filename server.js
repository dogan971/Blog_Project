const express = require("express");
const app = express();
const route = require("./routes/index");
const dotenv = require("dotenv");
const path = require("path");
const bodyparser = require("body-parser");
dotenv.config({
  path: "./config/config.env",
});
// MongoDB Connection
const connectionDatabase = require("./database/connectionDatabase");
connectionDatabase();
// Body Middleware

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
// Routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.use("/api", route);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  return console.log(`Server listening on port: ${PORT}`);
});
