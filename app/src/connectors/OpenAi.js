import { Configuration, OpenAIApi } from 'openai'


const openAiConfig = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})

const openAiClient = new OpenAIApi( openAiConfig )


export class OpenAi {


	/**
	 * Check if prompt fails OpenAI's moderation policies
	 *
	 * @param {string} prompt
	 * @return {bool} true, if fails moderation; otherwise, false
	 */
	static async failsModeration( prompt ) {
		const res = await openAiClient.createModeration({
			input: prompt,
		})

		// results will be an array of results
		// eslint-disable-next-line no-unsafe-optional-chaining
		const { results } = res?.data

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
			const res = await openAiClient.createImage({
				prompt,
				user: process.env.OPENAI_API_USER,
			})

			// data is wrapped in an Axios response
			url = res.data?.data[0]?.url

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
