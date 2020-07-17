const jwt = require('jsonwebtoken')
const secrets = require('../config/secret')


module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
      if (error) {
        console.log(error)
        res.status(401).json({ err: 'You are not worthy' })
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
    res.status(500).json({ message: 'You are not logged in, please try logging in', err })
  }
};