export const Polaroid = {


	states: {
		hasSubmitted: false,
		hasError: false,
		imageVisible: false,
		isSubmitting: false,
		canSubmit: false,
		isDeveloping: false,
		isDeveloped: false,
	},


	data: {
		endpointUrl: 'https://polaroid.robr.app',
		placeholderText: '',
		prompt: '',
		image: {
			url: '',
			permalink: '',
		},
		error: '',
	},


	/**
	 * Initiate the good stuff
	 *
	 * @return {void}
	 */
	init() {
		window.addEventListener( 'load', () => {
			this.generatePlaceholderText()
		})

		this.watchPrompt()
	},


	/**
	 * Watch prompt word count to show/hide submit button
	 *
	 * @return {void}
	 */
	watchPrompt() {
		let watchTimeout

		// show/hide submit button based on whether there's at least three words
		this.$watch( 'data.prompt', () => {
			clearTimeout( watchTimeout )

			watchTimeout = setTimeout( () => {
				const words = this.data.prompt.split( ' ' ).map( item => item.trim() ).filter( item => item )

				this.states.canSubmit = 3 <= words.length

				// reset error states
				this.states.hasError = false
				this.data.error = ''

			}, 250 )
		})
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

		if ( !auth || !auth.length ) {
			this.states.hasError = true
			this.data.error = 'Looks like you\'re missing an authorization code!'

			return
		}

		this.data.image.url = ''
		this.data.image.permalink = ''

		this.states.isDeveloping = false
		this.states.isDeveloped = false

		this.states.hasError = false
		this.data.error = ''

		this.states.isSubmitting = true

		const fetchBody = new URLSearchParams()

		fetchBody.set( 'auth', auth )
		fetchBody.set( 'prompt', this.data.prompt )

		fetch( this.data.endpointUrl, {
			method: 'post',
			body: fetchBody,
		})
			.then( res => res.json() )
			.then( res => this.processResponse( res ) )
			.catch( err => {
				console.warn( err )

				this.states.hasError = true
				this.data.error = 'Something went wrong! Please try again!'
			})
			.finally( () => {
				this.states.isSubmitting = false
			})
	},


	/**
	 * Process response when creating image
	 *
	 * @param {Object} res
	 * @return {void}
	 */
	processResponse( res ) {
		const { data } = res

		if ( res.error ) {
			let errorMessage = ''

			const { error } = data

			if ( 'string' === typeof error && error.length ) {
				errorMessage = error
			} else {
				errorMessage = 'Something went wrong! Please try again!'
			}

			this.states.hasError = true
			this.data.error = errorMessage

			return
		}

		this.states.isDeveloping = true

		const { url, permalink } = data.image

		this.data.image.url = url
		this.data.image.permalink = permalink

		setTimeout( () => {
			this.states.isDeveloped = true
		}, 300 )
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

				// const intervalBlink = setInterval( () => {
				// 	const { placeholderText } = this.data

				// 	let noTrailingPipe = placeholderText.endsWith( ' |' )

				// 	// if user starts typing, clear interval
				// 	if ( this.data.prompt.length ) {

				// 		// ensure no pipe in placeholder (in case user clears prompt)
				// 		noTrailingPipe = true

				// 		clearInterval( intervalBlink )
				// 	}

				// 	if ( noTrailingPipe ) {
				// 		this.data.placeholderText = placeholderText.slice( 0, placeholderText.length - 2 )
				// 	} else {
				// 		this.data.placeholderText = `${placeholderText} |`
				// 	}

				// }, 625 )
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
			'Generate a dream',
			'Imagine a world',
		]

		const randomIndex = Math.floor( Math.random() * possiblePlaceholderStrings.length )

		return possiblePlaceholderStrings[randomIndex]
	},


}
