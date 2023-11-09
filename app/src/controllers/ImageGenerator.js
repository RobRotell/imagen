import { OpenAi } from '../connectors/OpenAi.js'
import { RawImage } from '../models/RawImage.js'


export class ImageGenerator {


	/**
	 * Create image from prompt
	 *
	 * @todo count tokens
	 *
	 * @throws {Error} empty prompt
	 * // @throws {Error} insufficient tokens remaining
	 * @throws {Error} prompt failed moderation
	 * @throws {Error} failed to generate local image
	 *
	 * @param {string} prompt
	 * @return {string} URL
	 */
	static async createFromPrompt( prompt ) {
		if ( 'string' !== typeof prompt || !prompt.length ) {
			throw new Error( 'Words are needed to create beauty.' )
		}

		// check moderation
		const isFlagged = await OpenAi.failsModeration( prompt )

		if ( isFlagged ) {
			throw new Error( 'Prompt is flagged. Did you use naughty words?' )
		}

		try {
			// OpenAI will return an Azure URL
			const imageUrl = await OpenAi.generateImage( prompt )

			console.log( imageUrl )

			// handles downloading and saving image as JPEG and creating DB entry
			const rawImage = new RawImage( imageUrl, prompt )
			const localImage = rawImage.saveAsLocalImage()

			// local image has functions for local URLs and permalink
			return localImage

		} catch ( err ) {
			throw new Error( err.message )
		}
	}


}
