const db = require('../../db/db-config.js')

const find = () => {
    return db('cards')
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
    return db('cards')
        .where(filter)
}

const add = (card) => {
    return db('cards')
        .insert(card, 'id')
}

const update = (changes, id) => {
    return db('cards')
        .where({ id })
        .update(changes)
}

const remove = (id) => {
    return db('cards')
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