const expressAsyncHandler = require("express-async-handler");
const { tokenDecode } = require("../../helpers/tokenHelpers");
const Articles = require("../../models/Articles");

const checkOwnerArticle = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  tokenDecode(req, res);
  const author = req.user;
  const data = await Articles.findOne({ _id: id, author: author });
  if (!data) return res.json({ err: "you dont have this article" });
  req.article = data;

  next();
});

module.exports = {
  checkOwnerArticle,
};
