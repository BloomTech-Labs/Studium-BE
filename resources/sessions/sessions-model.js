const db = require('../../db/db-config')

const find = () => {
    return db('sessions')
}

const findById = (id) => {
    return db('sessions')
        .where({ id })
        .first()
}

const findBy = (filter) => {
    return db('sessions')
        .where(filter)
}

const add = (sessions) => {
    return db('sessions')
        .insert(sessions)
}

const update = (changes, id) => {
    return db('sessions')
        .where({ id })
        .update(changes)
}

const remove = (id) => {
    return db('sessions')
        .where({ id })
        .del()
}

module.exports = {
    find,
    findById,
    findBy,
    add,
    update,
    remove
}