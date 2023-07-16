import express from 'express'
import path from 'path'
import { publicBasePath } from '../constants/paths'
import { Auth } from '../controllers/Auth'
import { ImageGenerator } from '../controllers/ImageGenerator'
import { DbClient } from '../controllers/DbClient'


const router = express.Router()


// general view
router.get( '/', ( req, res ) => {
	res.sendFile( path.join( publicBasePath, 'index.html' ) )
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
			const imgFilePath = path.join( publicBasePath, `media/${mediaId}.jpg` )

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
	let { auth, prompt } = req.body

	auth = auth.trim()
	prompt = prompt.trim()

	const validAuth = Auth.validate( auth )

	if ( !validAuth ) {
		return res.status( 403 ).json({
			error: true,
			data: {
				error: 'Invalid auth code. Do I know you?',
			},
		})
	}

	if ( !prompt.length || 5 > prompt.length || 60 < prompt.length ) {
		return res.status( 400 ).json({
			error: true,
			data: {
				error: 'Prompt must be between 6 and 60 characters.',
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
