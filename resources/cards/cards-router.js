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
            if (card.length > 0) {
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

// ADD NEW CARD (POST)
router.post('/', (req, res) => {
    const cardData = req.body;

    db.add(cardData)
        .then(card => {
            if (!req.body.deck_id || !req.body.card_front || !req.body.card_back) {
                res.status(401).json({ errorMessage: "Please include a deck ID, card front, and card back!" })
            } else {
                res.status(201).json(card)
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error adding the card." })
        })
})

// UPDATE EXISTING CARD (PUT)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.findCardbyId(id)
        .then(card => {
            if (card.length > 0) {
                db.update(changes, id)
                    .then(updatedCard => {
                        res.status(200).json(updatedCard)
                    })
            } else {
                res.status(404).json({ errorMessage: "No such card with that ID exists." })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error updating the card." })
        })
})

// DELETE EXISTING CARD
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(deleted => {
            if (deleted.length > 0) {
                res.status(200).json({ removed: deleted })
            } else {
                res.status(404).json({ errorMessage: "No such card with that ID exists." })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error deleting the card." })
        })
})

module.exports = router;