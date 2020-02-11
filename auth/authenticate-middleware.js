const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

const Users = require("../users/users-model.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({
          message: "This token has not been verified. You shall not pass..."
        });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ message: "You do not have an authorized token. Go away !" });
  }
};
