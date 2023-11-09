import OpenAI from 'openai'


const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})


export class OpenAi {


	/**
	 * Check if prompt fails OpenAI's moderation policies
	 *
	 * @param {string} prompt
	 * @return {bool} true, if fails moderation; otherwise, false
	 */
	static async failsModeration( prompt ) {
		const res = await client.moderations.create({
			input: prompt,
		})

		// results will be an array of results
		// eslint-disable-next-line no-unsafe-optional-chaining
		const { results } = res

		if ( Array.isArray( results ) ) {
			return results[0]?.flagged
		}

		return true
	}


	/**
	 * Generate image from prompt
	 *
	 * @throws {Error} OpenAI returned error (sometimes service goes down)
	 * @throws {Error} unexpected return value (no URL)
	 *
	 * @param {string} prompt
	 * @return {string} URL of image on OpenAI's servers
	 */
	static async generateImage( prompt ) {
		let url = ''

		try {
			const res = await client.images.generate({
				model: 'dall-e-3',
				quality: 'hd',
				style: 'vivid',
				user: process.env.OPENAI_API_USER,
				prompt,
			})

			// data is wrapped in an Axios response
			url = res.data[0]?.url

		} catch ( err ) {
			// console.warn( err )
			throw new Error( 'Something exploded on OpenAI\'s side!' )
		}

		if ( 'string' !== typeof url || !url.length ) {
			throw new Error( 'OpenAI returned an unexpected value (expected URL).' )
		}

		return url
	}


}
