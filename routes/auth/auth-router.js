const router = require("express").Router();
const Users = require("../users/users-model.js");

router.post("/", (req, res) => {
  let newUser = req.body;
  Users.add(newUser)
    .then(user => res.status(201).json(user))
    .catch(err =>
      res
        .status(501)
        .json({ message: "error adding the user", error: err.message })
    );
});

module.exports = router;
