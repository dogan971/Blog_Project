const expressAsyncHandler = require("express-async-handler");
const { tokenDecode } = require("../helpers/tokenHelpers");
const Articles = require("../models/Articles");

const getArticles = expressAsyncHandler(async (req, res) => {
  const articles = await Articles.find();
  return res.render("articles", { articles });
});

const addArticles = expressAsyncHandler(async (req, res) => {
  if (req.method == "POST") {
    const { title, content } = req.body;
    const created_date = new Date().toUTCString();
    tokenDecode(req, res);
    await Articles.create({
      title,
      content,
      created_date,
      author: req.user,
    });
    return res.redirect("/api/user/dashboard");
  }
  return res.render("addarticle");
});

const editArticle = expressAsyncHandler(async (req, res) => {
  const article = req.data
  if (req.method == "POST") {
    const { title, content } = req.body;
    article.title = title;
    article = content;
    await article.save();
    return res.render("edit", { article });
  }
  return res.render("edit", { article });
});
module.exports = {
  getArticles,
  addArticles,
  editArticle,
};
