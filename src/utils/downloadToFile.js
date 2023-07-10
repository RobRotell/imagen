import https from 'https'
import * as fs from 'node:fs'


/**
 * Download and save to file
 *
 * @param {string} url
 * @param {string} filePath
 *
 * @return {<Promise>} resolves with file path; rejects with error
 */
// eslint-disable-next-line arrow-body-style
export const downloadToFile = async ( url, filePath ) => {
	return new Promise( ( resolve, reject ) => {
		const fileStream = fs.createWriteStream( filePath )

		https.get( url, res => {

			res.pipe( fileStream )

			fileStream.on( 'finish', () => {
				fileStream.close()

				resolve( filePath )
			})

		}).on( 'error', err => {
			reject( err )
		})
	})
}
