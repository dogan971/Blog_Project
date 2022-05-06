const expressAsyncHandler = require("express-async-handler");
const {
  tokenDecode,
  getTokenFromCookie,
} = require("../../helpers/tokenHelpers");
const Articles = require("../../models/Articles");

const checkOwnerArticle = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const token = getTokenFromCookie(req);
  tokenDecode(req, res, token);
  const author = req.user;
  await Articles.find({ id, author }, function (err, data) {
    if (err) return res.json({ error: err });
    req.article = data;
    return next();
  });
});

module.exports = {
  checkOwnerArticle,
};
