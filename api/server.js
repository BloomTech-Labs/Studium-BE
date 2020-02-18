const express = require( "express" );
const cors = require( "cors" );
const helmet = require( "helmet" );
const path = require( "path" );
const bodyParser = require( "body-parser" );

const authRouter = require( "../routes/auth/auth-router.js" );
const usersRouter = require( "../routes/users/users-router.js" );

const server = express();

server.use( helmet() );
server.use( cors() );
server.use( express.json() );
server.use( bodyParser.urlencoded( { extended: true } ) );

server.use( "/api/auth", authRouter );
server.use( "/api/users", usersRouter );

server.get( "/", ( req, res ) => {
  res.status( 200 ).json( { api: "Up and running" } );
} );
const apiDocsPath = path.join( __dirname, "../apidoc" );
server.use( "/", express.static( apiDocsPath ) );

module.exports = server;