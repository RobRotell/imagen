import express from 'express'
import path from 'path'
import { appBasePath } from '../constants/appBasePath'
import { Auth } from '../controllers/Auth'


const router = express.Router()


router.get( '/', ( req, res ) => {
	res.sendFile( path.join( appBasePath, '/public/app.html' ) )
})


router.post( '/', ( req, res ) => {
	const { auth, prompt } = req.body

	const validAuth = Auth.validate( auth )

	if ( !validAuth ) {
		return res.status( 403 ).json({
			error: true,
			data: {
				error: 'Invalid auth code. Do I know you?',
			},
		})
	}

	console.log( prompt )

	return res.json({
		test: true,
	})
})


export default router
