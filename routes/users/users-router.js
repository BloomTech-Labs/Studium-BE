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
 * @api  {put} /api/users   Edits an existing user
 * @apiVersion  1.0.0
 * @apiName EditExistingUser
 * @apiGroup  Users
 *
 * @apiHeader {String} auth  Users google uid.
 *
 * @apiHeaderExample  {json}  Header Example:
 *
 * {
 *  "auth": "321sdf516156s"
 * }
 *
 *
 * @apiParam  {String}      username        Users display name
 *
 * @apiExample  Request example:
 *
 * const request = axios.create({
 * baseURL: 'https://localhost:5000',
 * timeout: 1000
 * });
 *
 * request.put('api/users', {
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
  console.log("changes from PUT", changes);
  console.log("user from PUT", changes);
  Users.update(user.user_id, changes)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(501).json({
        message: "Error updating the user."
      });
    });
});

/**
 * @api {delete} /api/users     Delete an existing user.
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup Users

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
 *       timeout: 1000,
 * });
 * request.delete('/api/users');
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
      res.status(203).json({ message: "The user has been removed" });
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(503).json({
        message: "Error removing the user"
      });
    });
});

module.exports = router;
