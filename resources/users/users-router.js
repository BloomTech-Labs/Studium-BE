const express = require('express')

const Users = require('./users-model.js')

const router = express.Router()

const restricted = require('../../auth/authenticate-middleware')

router.get('/', (req, res) => {
   Users.find()
      .then(users => {
         res.json(users)
      })
      .catch(err => {
         res.status(500).json({ message: 'Failed to retrieve users' })
      })
})

router.get("/me", restricted, (req, res) => {
   Users.findById(decodedToken.id)
      .then(user => {
         delete user.password;
         res.status(201).json(user)
      })
      .catch(err => {
         res.status(500).json({ errMessage: "Failed to get user by ID" })
      })
})

router.get('/:id', (req, res) => {
   const { id } = req.params

   Users.findById(id)
      .then(user => {
         user
            ? res.json(user)
            : res.status(404).json({ message: 'Could not find a user with the given id' })
      })
      .catch(err => {
         res.status(500).json({ message: 'Failed to get user' });
      })
})

router.get('/:id/decks', (req, res) => {
   const { id } = req.params;

   Users.findDeckByUserId(id)
      .then(data => {
         data ?
            res.status(200).json(data) :
            res.status(404).json({ errMessage: "Cannot find user data." })
      })
      .catch(err => {
         res.status(500).json({ errMessage: "Unable to retrieve decks by User ID." })
      })
})

router.post('/', (req, res) => {
   const userData = req.body

   Users.add(userData)
      .then(user => {
         res.status(201).json(user)
      })
      .catch(err => {
         res.status(500).json({ message: 'Failed to create new user' });
      });
})

router.put('/:id', (req, res) => {
   const { id } = req.params
   const changes = req.body

   Users.findById(id)
      .then(user => {
         if (user) {
            Users.update(changes, id)
               .then(updatedUser => {
                  res.json(updatedUser)
               })
         } else {
            res.status(404).json({ message: 'Could not find a user with the given id' })
         }
      })
      .catch(err => {
         res.status(500).json({ message: 'Failed to update user' })
      })
})

router.delete('/:id', (req, res) => {
   const { id } = req.params

   Users.remove(id)
      .then(deleted => {
         deleted
            ? res.json({ removed: deleted })
            : res.status(404).json({ message: 'Could not find a user with the given id' })
      })
      .catch(err => {
         res.status(500).json({ message: 'Failed to delete user' });
      });
})

module.exports = router