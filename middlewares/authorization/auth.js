const getAccessToRoute = (req, res, next) => {
  const cookie = req.headers.cookie.split("; ")[5];
  if (!cookie) return res.redirect("/");
  next();
};

module.exports = { getAccessToRoute };
