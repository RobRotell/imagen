#!/usr/bin/env node


import http from 'http'
import { log } from 'console'
import { app } from '../app'


// get port and set in Express
const port = process.env.PORT
app.set( 'port', port )


// create server
const server = http.createServer( app )


// debugging
const onListening = () => {
	const addr = server.address()
	const bind = 'string' === typeof addr ? `pipe ${addr}` : `port ${addr.port}`

	log( `Listening on ${bind}` )
}


// listen on port
server.listen( port )
server.on( 'listening', onListening )
