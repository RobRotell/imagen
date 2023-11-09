import * as fs from 'node:fs'
import path from 'path'
import sharp from 'sharp'
import { publicBasePath } from '../constants/paths.js'
import { downloadToFile } from '../utils/downloadToFile.js'
import { hashValue } from '../utils/hashValue.js'
import { DbClient } from '../controllers/DbClient.js'
import { LocalImage } from './LocalImage.js'


export class RawImage {


	#url = ''

	#prompt = ''


	/**
	 * Create instance
	 *
	 * @param {string} url URL of image on OpenAI's servers
	 * @param {string} prompt Prompt to be used in hashing
	 */
	constructor( url, prompt ) {
		this.url = url
		this.prompt = prompt
	}


	/**
	 * Get ID of entry row in DB
	 *
	 * @return {int}
	 */
	getEntryId() {
		return this.entryId
	}


	/**
	 * Download and save image, including creating a DB entry
	 *
	 * @throws {Error} failed to download/save image
	 * @throws {Error} failed to create JPG variant
	 *
	 * @return {LocalImage}
	 */
	async saveAsLocalImage() {
		const fileBaseName = hashValue( `${Date.now()} - ${this.prompt}` )
		const filePathPng = path.join( publicBasePath, `media/${fileBaseName}.png` )
		const filePathJpg = path.join( publicBasePath, `media/${fileBaseName}.jpg` )

		// download file from OpenAI
		try {
			await downloadToFile( this.url, filePathPng )
		} catch ( err ) {
			throw new Error( 'Failed to download and save image.' )
		}

		// create JPG variant
		try {
			await sharp( filePathPng ).jpeg({
				mozjpeg: true,
			}).toFile( filePathJpg )

			// delete original PNG
			fs.unlinkSync( filePathPng )

		} catch ( err ) {
			throw new Error( 'Failed to create JPEG variant.' )
		}

		// used for short permalinks
		const hashId = await this.generateHashId( fileBaseName )
		const dbClient = DbClient.getClient()

		const entry = await dbClient.entries.create({
			data: {
				date: new Date().toISOString(),
				prompt: this.prompt,
				mediaId: fileBaseName,
				hashId,
			},
		})

		return new LocalImage( entry )
	}


	/**
	 * Create unique hash ID for media entry
	 *
	 * @param {string} val
	 * @return {string}
	 */
	// eslint-disable-next-line class-methods-use-this
	async generateHashId( val ) {
		const dbClient = DbClient.getClient()

		let isUnique = false
		let hashId = hashValue( val ).slice( 0, 6 )

		while ( !isUnique ) {

			// eslint-disable-next-line no-await-in-loop
			const matches = await dbClient.entries.findFirst({
				where: {
					hashId,
				},
			})

			if ( !matches ) {
				isUnique = true

			// re-hash value
			} else {
				hashId = hashValue( hashId ).slice( 0, 6 )
			}
		}

		return hashId
	}

}
