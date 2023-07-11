export class Utils {


	/**
	 * Generate random integer based on passed minimum and maximum values
	 *
	 * @param {int} min Minimum value
	 * @param {int} max Maximum value
	 *
	 * @return {int}
	 */
	static generateRandomInt( min, max ) {
		return Math.floor( Math.random() * ( max - min + 1 ) + min )
	}


	/**
	 * Randomize order of elements in array
	 *
	 * @see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	 *
	 * @param {array} target Array to randomize
	 * @return {array}
	 */
	static shuffleArray( target ) {
		let currentIndex = target.length
		let randomIndex

		while ( 0 !== currentIndex ) {
			randomIndex = Math.floor( Math.random() * currentIndex )

			// eslint-disable-next-line no-plusplus
			currentIndex--

			// eslint-disable-next-line no-param-reassign
			[target[currentIndex], target[randomIndex]] = [
				target[randomIndex], target[currentIndex],
			]
		}

		return target
	}


}
