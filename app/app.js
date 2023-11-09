import 'dotenv/config'


import express from 'express'
import morgan from 'morgan'


import routerIndex from './src/routes/index.js'
import { publicBasePath } from './src/constants/paths.js'


const app = express()


// app.engine( 'html', require( 'ejs' ).renderFile )
app.use( express.json() )
app.use( express.urlencoded({ extended: true }) )
app.use( morgan( 'tiny' ) )
app.use( express.static( publicBasePath ) )


app.use( routerIndex )


export {
	app,
}
