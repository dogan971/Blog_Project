const express = require("express");
const Router = express.Router();
const {
  getArticles,
  addArticles,
  editArticle,
} = require("../controller/articles");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const {
  checkOwnerArticle,
} = require("../middlewares/modelMiddleware/checkModel");
Router.get("/", getArticles);
Router.get("/addarticle", getAccessToRoute, addArticles).post(
  "/addarticle",
  addArticles
);
Router.get(
  "/editarticle/:id",
  [getAccessToRoute, checkOwnerArticle],
  editArticle
).post("/editarticle", editArticle);

module.exports = Router;
