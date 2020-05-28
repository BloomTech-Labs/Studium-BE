const knex = require('knex')
const config = require('../knexfile.js')

const environment = "production"

module.exports = knex(config[environment])