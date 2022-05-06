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
  const article = req.article;
  if (req.method == "GET") {
    return res.render("edit", { article });
  }
  const { title, content } = req.body;
  const id = req.article[0]._id;
  await Articles.findByIdAndUpdate(id, { title, content });
  return res.redirect("/api/user/dashboard");
});

const deleteArticle = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  await Articles.findByIdAndDelete(id);
  return res.redirect("/api/user/dashboard");
});
const detailArticle = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const article = await Articles.findById(id);
  if (article) return res.render("detail", { article });
  return res.json({ message: "article not found " });
});
module.exports = {
  getArticles,
  addArticles,
  editArticle,
  deleteArticle,
  detailArticle,
};
