export class LocalImage {


	#id = null

	#date = null

	#prompt = null

	#mediaId = null

	#hashId = null


	/**
	 * Create instance
	 *
	 * @param {object} entry Database entry row
	 */
	constructor( entry ) {

		// eslint-disable-next-line object-curly-newline
		const { id, date, prompt, mediaId, hashId } = entry

		this.id = id
		this.date = date
		this.prompt = prompt
		this.mediaId = mediaId
		this.hashId = hashId
	}


	/**
	 * Get ID
	 *
	 * @return {int}
	 */
	getId() {
		return this.id
	}


	/**
	 * Get media URL
	 *
	 * @return {string}
	 */
	getUrl() {
		return `${process.env.APP_URL}/media/${this.mediaId}.jpg`
	}


	/**
	 * Get shortened/hash link
	 *
	 * @return {string}
	 */
	getPermalink() {
		return `${process.env.APP_URL}/i/${this.hashId}`
	}


}
