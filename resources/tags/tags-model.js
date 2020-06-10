const db = require('../../db/db-config.js')

const find = () => {
    return db('decks')
}

const findTagById = (id) => {
    return db("tags as t")
        .where({ id })
        .first()
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
    findTagById,
    findBy,
    add,
    update,
    remove
}