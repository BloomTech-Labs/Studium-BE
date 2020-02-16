const UserDb = require("../users/users-model.js");

module.exports = (req, res, next) => {
  const { uid } = req.body;

  UserDb.findBy(uid)
    .then(user => {
      req.user = user;
      next(req, res);
    })
    .catch(err => {
      res.status(404).json({ message: "uid not found", error: err });
    });
};
