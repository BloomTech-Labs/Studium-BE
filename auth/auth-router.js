const router = require('express').Router();
const User = require("../users/user-model.js")
const bcrypt = require("bcryptjs")
const secret = require("../config/secret.js")
const jwt = require("jsonwebtoken")

//need to add email, first name, last name

//NEED TO IMPLEMENT THIS 
//createdAt: {
//     type: Date,
//     required: true,
//     default: Date.now,
//     expires: 43200
// }, {timestamps: true}
router.post('/api/register', (req, res) => {
  //registration 
  const user = req.body
  user.password = bcrypt.hashSync(user.password, 10)
  User.insertUser(user)
  .then(newUser =>{
    user.id=newUser[0]
    delete user.password
    const token = generateToken(user)
    res.status(201).json(user, token)
  })
  .catch(err =>{
    res.status(500).json({message: "Error with adding user", err})
  })
  
});

router.post('/api/login', (req, res) => {
  //login
  const {username, password} = req.body

  User.findBy({ username })
      .first()
      .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
             const token = generateToken(user) 
             res.status(200).json({ username, token })
          } else {
              res.status(401).json({ message: "Invalid credentials, try again" })
          }
      })
      .catch(err => {
          res.status(500).json({ message: "An error occured while logging in", err })
      })
});
function generateToken(user) {
  const payload = { 
      userId: user.id,
      username: user.username
  }
  const options = {
      expiresIn: "2d"
  }
  const token = 
      jwt.sign(payload, secret.jwtSecret, options)
      return token
  
}
module.exports = router;