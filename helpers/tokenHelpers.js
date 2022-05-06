const jsonwebtoken = require("jsonwebtoken");
const sendJWTToClient = (req, res, next, user) => {
  const token = user.generateJWTFromUser();
  res.cookie("Cookie", token, {
    httpOnly: true,
    expiresIn: new Date(
      Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60
    ),
  });
  return res.redirect("/");
};

const tokenDecode = (req, res) => {
  const token = getTokenFromCookie()
  if (token == null) return res.status(400).json({ message: "tokenError" });
  jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: err });
    req.user = user.name;
  });
};

const getTokenFromCookie = (req) => {
  return req.headers.cookie.split("; ")[5].split("=")[1];
};
module.exports = { tokenDecode, sendJWTToClient, getTokenFromCookie };
