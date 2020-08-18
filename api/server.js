const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const usersRouter = require('../resources/users/users-router.js')
const decksRouter = require('../resources/decks/decks-router.js')
const cardsRouter = require('../resources/cards/cards-router.js')
const sessionsRouter = require('../resources/sessions/sessions-router.js')
const authRouter = require('../auth/auth-router.js')
// --> insert auth middleware path(s) here

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/users', usersRouter) // --> missing auth middleware
server.use('/api/decks', decksRouter) // --> missing auth middleware
server.use('/api/cards', cardsRouter) // --> missing auth middleware
server.use('/api/sessions', sessionsRouter) // --> missing auth middleware
server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
   res.status(200).json({ message: "The api is up." })
})

module.exports = server;