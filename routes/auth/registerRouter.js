const router = require("express").Router();
const Users = require("../users/users-model.js");

/**
 * @api {post} /api/register     Create a new user.
 * @apiVersion 1.0.0
 * @apiName PostNewUsers
 * @apiGroup Users
 *
 * @apiParam {String} uid         Users google UID.
 * @apiParam {String} username    Users username.
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'https://staging-lambda-synaps-be.herokuapp.com/',
        timeout: 1000,
 * });
 * request.post('/api/register', {
 *    uid: "1kdhio39578sil;",
 *    username: "Jeremiah Tenbrink"
 * });
 *
 * @apiUse Error
 *
 * @apiSuccessExample User Data
 *
 {
    "user_id": 10,
    "uid": "someothersuisomethingfdafdadfadfsdadfda",
    "username": "Jeremiah343223656654",
    "created_at": "2020-02-18 14:15:20.463231-07",
    "updated_at": "2020-02-18 14:15:20.463231-07"
}
 *
 */

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
