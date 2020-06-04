const express = require('express')
const Sessions = require('./sessions-model.js')
const router = express.Router()

router.get('/', (req, res) => {
    Sessions.find()
        .then(sessions => {
            res.json(sessions)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to retrieve sessions'})
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Sessions.findById(id)
        .then(session => {
            session
                ? res.json(session)
                : res.status(404).json({ message: 'Could not find the session'})
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get a session'})
        })
})

router.post('/', (req, res) => {
    const sessionsData = req.body;
 
    Sessions.add(sessionsData)
       .then(session => {
          res.status(201).json(session)
       })
       .catch (err => {
          res.status(500).json({ message: 'Failed to create a new session' });
        });
 })
 
 router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
 
    Sessions.findById(id)
       .then(session => {
          if (session) {
             Sessions.update(changes, id)
                .then(updatedSession => {
                   res.json(updatedSession)
                })
          } else {
             res.status(404).json({ message: 'Could not find a session with the given id' })
          }
       })
       .catch(err => {
          res.status(500).json({ message: 'Failed to update session' })
       })
 })
 
 router.delete('/:id', (req, res) => {
    const { id } = req.params;
 
    Sessions.remove(id)
       .then(deleted => {
          deleted
             ? res.json({ removed: deleted })
             : res.status(404).json({ message: 'Could not find a session with the given id' })
       })
       .catch(err => {
          res.status(500).json({ message: 'Failed to delete the sessions' });
        });
 })

module.exports = router;