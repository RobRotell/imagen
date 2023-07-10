import express from 'express'
import path from 'path'
import { appBasePath } from '../constants/appBasePath'
import { Auth } from '../controllers/Auth'
import { ImageGenerator } from '../controllers/ImageGenerator'
import { DbClient } from '../controllers/DbClient'


const router = express.Router()


// general view
router.get( '/', ( req, res ) => {
	res.sendFile( path.join( appBasePath, '/public/app.html' ) )
})


// return image by ID
router.get( '/i/:id', async ( req, res ) => {
	const { params: { id } } = req

	if ( id ) {
		const dbClient = DbClient.getClient()

		const match = await dbClient.entries.findFirst({
			select: {
				mediaId: true,
			},
			where: {
				hashId: id,
			},
		})

		if ( match ) {
			const { mediaId } = match
			const imgFilePath = path.join( appBasePath, `public/media/${mediaId}.jpg` )

			return res.sendFile( imgFilePath )
		}
	}

	return res.status( 404 ).json({
		error: true,
		data: {
			error: `No image matched ID: "${id}"`,
		},
	})
})


// create image
router.post( '/', async ( req, res ) => {
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

	try {
		const image = await ImageGenerator.createFromPrompt( prompt )

		return res.json({
			data: {
				image: {
					id: image.getId(),
					url: image.getUrl(),
					permalink: image.getPermalink(),
				},
			},
		})

	} catch ( err ) {
		return res.status( 500 ).json({
			error: true,
			data: {
				error: err.message,
			},
		})
	}
})


export default router
