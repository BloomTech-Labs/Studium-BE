const express = require('express')

const db = require('./tags-model.js')

const router = express.Router()

// GET ALL TAGS
router.get('/', (req, res) => {
    db.find()
        .then(tags => {
            res.json(tags)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error retrieving the tags!" })
        })
})

// GET SPECIFIC TAG
router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.findTagById(id)
        .then(tag => {
            if (tag.length) {
                res.status(200).json(tag)
            } else {
                res.status(404).json({ errorMessage: "No such tag with that ID exists." })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error retrieving the tag!" })
        })
})