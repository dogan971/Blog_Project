const express = require("express");
const Router = express.Router();
const { getArticles, addArticles } = require("../controller/articles");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
Router.get("/", getArticles);
Router.get("/addarticle", getAccessToRoute, addArticles).post(
  "/addarticle",
  getAccessToRoute,
  addArticles
);

module.exports = Router;
