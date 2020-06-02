const db = require('../../db/db-config.js')

module.exports = {
    getCardbyId,
    getCardTags
}

function getCardbyId(id) {
    return db("cards as c")
        .where({ id })
}

function getCardTags(id) {
    return db("tags as t")
        .where({ id: id })
}