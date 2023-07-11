import { Utils } from './utils'


// holds Matter object after loaded
let Matter


export class Floor {


	static canvas = null

	static container = null

	static engine = null

	static render = null

	static runner = null

	static polaroids = []


	/**
	 * Kicks off class
	 *
	 * @return {void}
	 */
	static init() {
		Floor.canvas = document.getElementById( 'floor-matter' )
		Floor.container = document.getElementById( 'floor' )

		import( 'matter-js' ).then( matterJs => {
			Matter = matterJs

			Floor.start()
		})
	}


	/**
	 * "Actually" kicks off class
	 *
	 * @return {void}
	 */
	static start() {
		Floor.engine = Matter.Engine.create()
		Floor.engine.gravity.x = 0
		Floor.engine.gravity.y = 0

		Floor.render = Matter.Render.create({
			canvas: Floor.canvas,
			element: Floor.container,
			engine: Floor.engine,
			options: {
				showSleeping: true,
				background: '#330459',
				hasBounds: true,
				height: window.innerHeight,
				width: window.innerWidth,
				wireframes: false,
			},
		})

		Floor.runner = Matter.Runner.create()

		Floor.generatePolaroids()
		Floor.renderWorld()
	}


	/**
	 * Generate polaroid images
	 *
	 * @return {void}
	 */
	static generatePolaroids() {
		const count = 0.5 * window.innerWidth

		for ( let i = 0; count >= i; ++i ) {
			Floor.polaroids.push( Floor.createPolaroid() )
			Floor.polaroids = Utils.shuffleArray( Floor.polaroids )
		}
	}


	/**
	 * Generate MatterJS body for individual polaroids
	 *
	 * @return {Object}
	 */
	static createPolaroid() {
		const posX = Utils.generateRandomInt( 50, window.innerWidth - 50 )
		const posY = Utils.generateRandomInt( 50, window.innerHeight - 50 )
		const angle = Utils.generateRandomInt( 0, 360 )

		// @see https://github.com/parcel-bundler/parcel/issues/3056#issuecomment-493745825
		// eslint-disable-next-line global-require
		const svgImgUrl = require( '../img/polaroid.svg' )

		return Matter.Bodies.circle( posX, posY, 24, {
			angle,
			density: 5e-6,
			frictionAir: 0,
			restitution: 1,
			friction: 0.01,
			mass: 0,
			render: {
				sprite: {
					texture: svgImgUrl,
				},
			},
		})
	}


	/**
	 * Renders background through MatterJS
	 *
	 * @return {void}
	 */
	static renderWorld() {
		Matter.Composite.add( Floor.engine.world, Floor.polaroids )
		Matter.Render.run( Floor.render )
		Matter.Runner.run( Floor.runner, Floor.engine )
	}


}
