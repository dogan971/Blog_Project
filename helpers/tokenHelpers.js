const jsonwebtoken = require("jsonwebtoken");
const sendJWTToClient = (req, res, next, user) => {
  const token = user.generateJWTFromUser();
  console.log(token);
  res.cookie("Cookie", token, {
    httpOnly: true,
    expiresIn: new Date(Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60),
  });
  return res.redirect("/");
};

const tokenDecode = (req, res, token) => {
  if (token == null) return res.status(400).json({ message: "tokenError" });
  jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: err });
    req.user = user.name;
  });
};

module.exports = { tokenDecode, sendJWTToClient };
