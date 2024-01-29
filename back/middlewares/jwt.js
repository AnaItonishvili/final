const jwt = require("jsonwebtoken");
const cookie = require("cookie");

function authenticateToken(req, res, next) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: "Authentication failed. Token missing." });
  }

  jwt.verify(token, process.env.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Authentication failed. Invalid token." });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
