export default () => ({


	states: {
		hasSubmitted: false,
		hasError: false,
		imageVisible: false,
		isSubmitting: false,
	},


	data: {
		endpointUrl: 'http://localhost:3001',
		placeholderText: '',
		prompt: '',
		image: {
			url: {

			},
			alt: '',
		},
		error: '',
	},


	/**
	 * Initiate the good stuff
	 *
	 * @return {void}
	 */
	init() {
		this.generatePlaceholderText()
	},


	/**
	 * Submit user-inputted prompt
	 *
	 * @return {void}
	 */
	submitPrompt() {
		console.log( this.data.prompt )
	},


	/**
	 * Generate placeholder text for textarea
	 *
	 * @return {void}
	 */
	generatePlaceholderText() {
		const placeholderString = `${this.getRandomPlaceholderText()} ...`

		let strLen = 0

		const intervalTyping = setInterval( () => {
			const strLenEnd = strLen + 1

			this.data.placeholderText += placeholderString.slice( strLen, strLenEnd )

			// clear interval once string has been typed out
			if ( strLen === placeholderString.length ) {
				clearInterval( intervalTyping )

				const intervalBlink = setInterval( () => {
					const { placeholderText } = this.data

					let noLeadingPipe = placeholderText.endsWith( ' |' )

					// if user starts typing, clear interval
					if ( this.data.prompt.length ) {

						// ensure no pipe in placeholder (in case user clears prompt)
						noLeadingPipe = true

						clearInterval( intervalBlink )
					}

					if ( noLeadingPipe ) {
						this.data.placeholderText = placeholderText.slice( 0, placeholderText.length - 2 )
					} else {
						this.data.placeholderText = `${placeholderText} |`
					}

				}, 625 )
			}

			strLen = strLenEnd

		}, 45 )
	},


	/**
	 * Get random placeholder text
	 *
	 * @return {string}
	 */
	getRandomPlaceholderText() {
		const possiblePlaceholderStrings = [
			'Build a world',
			'Conceive a scene',
			'Create a photograph',
			'Discover a spectacle',
			'Forge a landscape',
			'Generate a scenario',
			'Imagine a world',
		]

		const randomIndex = Math.floor( Math.random() * possiblePlaceholderStrings.length )

		return possiblePlaceholderStrings[randomIndex]
	},


})
