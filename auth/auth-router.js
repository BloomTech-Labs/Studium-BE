const router = require('express').Router();
const User = require("../resources/users/users-model.js")
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
router.post('/register', (req, res) => {
  //registration 
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash

  User.add(user)
    .then(newUser =>{
      res.status(201).json(newUser)
    })
    .catch(err =>{
      res.status(500).json({message: "Error with adding user", err})
    })
  
});

router.post('/login', (req, res) => {
  //login
  const {username, password} = req.body

  User.findBy({ username })
      .first()
      .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
             const token = generateToken(user) 
             res.status(200).json({ 
              message: `Welcome ${user.username}`, 
              token 
            })
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
      subject: user.id,
      username: user.username
  }
  const options = {
      expiresIn: "2d"
  }
  
  return jwt.sign(payload, secret.jwtSecret, options)
}

module.exports = router;