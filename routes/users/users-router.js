const router = require("express").Router();
const DEBUG_NAME = "USERS";

const Users = require("./users-model.js");
const createError = require("../utils/createError");

/**
 * @api {get} /api/users/me    Gets current user
 * @apiVersion 1.0.0
 * @apiName GetUserByUID
 * @apiGroup Users
 *
 * @apiHeader {String} auth  Users google uid.
 * 
 * @apiHeaderExample  {json}  Header Example:
 * 
 * {
 *  "auth": "321sdf516156s"
 * }
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:5000/',
        timeout: 1000,
 * });
 * request.get('/api/users/me');
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
router.get("/me", (req, res) => {
  const user = req.user;
  if (user) {
    res.logger.success(DEBUG_NAME, "Returning user");
    return res.status(200).json(user);
  }
});

/**
 * @api {get} /api/users/all     Gets all users
 * @apiVersion 1.0.0
 * @apiName GetAllUsers
 * @apiGroup Users
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:5000/',
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

router.put("/", (req, res) => {
  const user = req.user;
  const changes = req.body;
  Users.update(user.user_id, changes)
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

/**
 * @api {delete} /api/users/:id     Delete an existing user.
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiParam {String} id         Users unique id number
 * @apiParam {String} username    Users username.
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:5000/',
 *       timeout: 1000,
 * });
 * request.delete('/api/users/:id');
 *
 * @apiUse Error
 *
 * @apiSuccessExample User Data
 *
 * { message: "The user has been removed" }
 */

router.delete("/", (req, res) => {
  const user = req.user;
  Users.remove(user.user_id)
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
