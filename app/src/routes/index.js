import express from 'express'
import path from 'path'
import { check } from 'express-validator'
import { existsSync } from 'fs'
import { publicBasePath } from '../constants/paths.js'
import { Auth } from '../controllers/Auth.js'
import { ImageGenerator } from '../controllers/ImageGenerator.js'
import { DbClient } from '../controllers/DbClient.js'


const router = express.Router()


// general view
router.get( '/', ( req, res ) => {
	res.sendFile( path.join( publicBasePath, 'index.html' ) )
})


// return image by ID
router.get(
	'/i/:id',
	[
		check( 'id' ).trim().escape(),
	],
	async ( req, res ) => {
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

				if ( !existsSync( imgFilePath ) ) {
					res.status( 404 ).json({
						error: true,
						data: {
							error: 'ID is attached to an image, but image wasn\'t found. Maybe it was deleted?',
						},
					})
				}

				return res.sendFile( imgFilePath )
			}
		}

		return res.status( 404 ).json({
			error: true,
			data: {
				error: `No image matched ID: "${id}"`,
			},
		})
	},
)


// create image
router.post(
	'/',
	[
		check( 'auth' ).trim().escape(),
		check( 'prompt' ).trim().escape(),
	],
	async ( req, res ) => {
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

		if ( !prompt.length || 5 > prompt.length || 1000 < prompt.length ) {
			return res.status( 400 ).json({
				error: true,
				data: {
					error: 'Prompt must be between 6 and 1000 characters.',
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
	},
)


export default router
