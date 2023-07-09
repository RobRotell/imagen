import express from 'express'
import path from 'path'
import { appBasePath } from '../constants/appBasePath'


const router = express.Router()


router.get( '/', ( req, res ) => {
	res.sendFile( path.join( appBasePath, '/public/app.html' ) )
})


export default router
