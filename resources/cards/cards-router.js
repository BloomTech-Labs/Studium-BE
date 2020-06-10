const express = require('express');
const router = express.Router();
const db = require('./cards-model.js')


// GET ALL CARDS
router.get('/', (req, res) => {
    db.find()
        .then(cards => {
            res.json(cards)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error retrieving the cards!" })
        })
})

// GET SPECIFIC CARD 
router.get("/:id", (req, res) => {
    db.getCardbyId(req.params.id)
        .then(card => {
            if (card.length) {
                card.forEach(card => {
                    db.getCardTags(req.params.id).then(tags => {
                        card.tags = tags;
                        res.status(201).json(card)
                    })
                })
            } else {
                res.status(404).json({ errorMessage: "No such card with that ID exists." })
            }

        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error retrieving the card!" })
        })
})