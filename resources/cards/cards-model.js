const db = require('../../db/db-config.js')

const find = () => {
    return db('decks')
}

const findCardbyId = (id) => {
    return db("cards as c")
        .where({ id })
        .first()
}

function getCardTags(id) {
    return db("tags as t")
        .where({ id: id })
}

const findBy = (filter) => {
    return db('decks')
        .where(filter)
}

const add = (deck) => {
    return db('decks')
        .insert(deck, 'id')
}

const update = (changes, id) => {
    return db('decks')
        .where({ id })
        .update(changes)
}

const remove = (id) => {
    return db('decks')
        .where({ id })
        .del()
}

module.exports = {
    find,
    findCardbyId,
    getCardTags,
    findBy,
    add,
    update,
    remove
}