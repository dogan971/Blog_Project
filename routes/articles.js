const express = require("express");
const Router = express.Router();
const {
  getArticles,
  addArticles,
  editArticle,
  deleteArticle,
  detailArticle
} = require("../controller/articles");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const {
  checkOwnerArticle,
} = require("../middlewares/modelMiddleware/checkModel");
Router.get("/", getArticles);
Router.get("/addarticle", getAccessToRoute, addArticles).post(
  "/addarticle",
  getAccessToRoute,
  addArticles
);
Router.get(
  "/editarticle/:id",
  [getAccessToRoute, checkOwnerArticle],
  editArticle
).post("/editarticle/:id", [getAccessToRoute, checkOwnerArticle], editArticle);

Router.get(
  "/deletearticle/:id",
  [getAccessToRoute, checkOwnerArticle],
  deleteArticle
);
Router.get("/detail/:id",detailArticle);
module.exports = Router;
