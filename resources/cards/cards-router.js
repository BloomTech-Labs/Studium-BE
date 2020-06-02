const express = require('express');
const router = express.Router();
const db = require('../cards/cards-model.js')

router.get("/:id", (req, res) => {
    db.getCardbyId(req.params.id)
        .then(card => {
            card.forEach(card => {
                db.getCardTags(req.params.id).then(tags => {
                    card.tags = tags;
                    res.status(201).json(card)
                })
            })

        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error retrieving the card!" })
        })
})