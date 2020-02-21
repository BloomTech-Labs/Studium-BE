const router = require("express").Router();

const Users = require("./users-model.js");

/**
 * @api {post} /api/users/me    Gets current user
 * @apiVersion 1.0.0
 * @apiName GetUserByUID
 * @apiGroup Users
 *
 * @apiParam {String} uid  Users google uid.
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'https://staging-lambda-synaps-be.herokuapp.com/',
        timeout: 1000,
 * });
 * request.post('/api/users/me', {
 *   uid: "123456080978"
 * });
 *
 * @apiUse Error
 *
 * @apiSuccessExample User Data
 *
 {
    "user_id": 1,
    "uid": "12345",
    "username": "Jeremiah Tenbrink",
    "created_at": "2020-02-18 14:10:08.566262-07",
    "updated_at": "2020-02-18 14:10:08.566262-07"
}
 *
 */
router.post("/me", (req, res) => {
  const user = req.user;
  return res.status(200).json(user);
});

/**
 * @api {get} /api/users/all     Gets all users
 * @apiVersion 1.0.0
 * @apiName GetAllUsers
 * @apiGroup Users
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'https://staging-lambda-synaps-be.herokuapp.com/',
        timeout: 1000,
 * });
 * request.get('/api/users');
 *
 * @apiUse Error
 *
 * @apiSuccessExample User Data
 *
 [  {
        "user_id": 1,
        "uid": "12345",
        "username": "Jeremiah Tenbrink",
        "created_at": "2020-02-18 14:10:08.566262-07",
        "updated_at": "2020-02-18 14:10:08.566262-07"
    },
 {
        "user_id": 5,
        "uid": "someothersui",
        "username": "Jeremiah",
        "created_at": "2020-02-18 14:12:47.906184-07",
        "updated_at": "2020-02-18 14:12:47.906184-07"
    }, ...
 
 ]
 *
 */

router.get("/all", (req, res) => {
  Users.getAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error getting users." });
    });
});

/**
 * @api  {put} /api/users/:id   Edits an existing user
 * @apiVersion  1.0.0
 * @apiName EditExistingUser
 * @apiGroup  Users
 *
 * @apiParam  {Number}      user_id       Users unique id number
 * @apiParam  {String}      uid           Users google number
 * @apiParam  {String}      username       Users display name
 * @apiParam  {String}      [created_at]  timestamp for first time created
 * @apiParam  {String}      [updated_at]  timestamp for last time updated
 *
 * @apiExample  Request example:
 *
 * const request = axios.create({
 * baseURL: 'https://localhost:5000',
 * timeout: 1000
 * });
 *
 * request.put('api/users/1', {
 * "username": "newUserName"
 * })
 *
 * @apiUse Error
 *
 * @apiSuccessExample User Data
 *
 * {
 *  "user_id": 1,
 *  "username": "newUserName",
 * "uid": "1859027",
 * "created_at": "2020-02-18 14:10:08.566262-07",
 * "updated_at": "2020-02-20 20:26:08.566262-07"
 * }
 */

router.put("/:id", (req, res) => {
  const changes = req.body;
  Users.update(req.params.id, changes)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error updating the user."
      });
    });
});

router.delete("/:id", (req, res) => {
  Users.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The user has been removed" });
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error removing the user"
      });
    });
});

module.exports = router;
