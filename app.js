import 'dotenv/config'


import express from 'express'
import morgan from 'morgan'
import path from 'path'


import routerIndex from './src/routes/index'
import { appBasePath } from './src/constants/appBasePath'


const app = express()


// app.engine( 'html', require( 'ejs' ).renderFile )
app.use( express.json() )
app.use( express.urlencoded({ extended: false }) )
app.use( morgan( 'tiny' ) )
app.use( express.static( path.join( appBasePath, 'public' ) ) )


app.use( routerIndex )


export {
	app,
}
