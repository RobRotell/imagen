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
	async submitPrompt() {
		if ( this.states.isSubmitting || !this.data.prompt.length ) {
			return
		}

		const url = new URL( window.location )
		const auth = url.searchParams.get( 'auth' )

		if ( !auth.length ) {
			this.states.hasError = true
			this.data.error = 'Looks like you\'re missing an authorization code!'
		}

		this.states.isSubmitting = true
		this.states.hasError = false
		this.data.error = ''

		const fetchBody = new URLSearchParams()

		fetchBody.set( 'auth', auth )
		fetchBody.set( 'prompt', this.data.prompt )

		fetch( this.data.endpointUrl, {
			method: 'post',
			body: fetchBody,
		}).then( res => {
			console.log( res )
			return res.json()
		}).then( res => {
			console.log( res )

		}).catch( err => {
			console.warn( err )

		}).finally( () => {
			this.states.isSubmitting = false
		})
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
