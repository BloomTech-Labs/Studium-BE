const db = require('../../db/db-config.js')

const find = () => {
    return db('tags')
}

const findTagById = (id) => {
    return db("tags as t")
        .where({ id })
        .first()
}

const findBy = (filter) => {
    return db('tags')
        .where(filter)
}

const add = (tag) => {
    return db('tags')
        .insert(tag, 'id')
}

const update = (changes, id) => {
    return db('tags')
        .where({ id })
        .update(changes)
}

const remove = (id) => {
    return db('tags')
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