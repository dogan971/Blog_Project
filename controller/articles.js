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
    const token = req.headers.cookie.split("; ")[5].split("=")[1];
    tokenDecode(req, res, token);
    console.log(token);
    await Articles.create({
      title,
      content,
      created_date,
      author: req.user,
    });
    articles = await Articles.find();
    return res.redirect("/api/articles");
  }
  return res.render("addarticle");
});

module.exports = {
  getArticles,
  addArticles,
};
