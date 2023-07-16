import { Utils } from './Utils'
import Matter from 'matter-js'


export class Background {


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
	static load() {
		Background.canvas = document.querySelector( '.background__canvas' )
		Background.container = document.querySelector( '.background' )

		window.requestAnimationFrame( Background.start )
	}


	/**
	 * "Actually" kicks off class
	 *
	 * @return {void}
	 */
	static start() {
		Background.engine = Matter.Engine.create()
		Background.engine.gravity.x = 0
		Background.engine.gravity.y = 0

		Background.render = Matter.Render.create({
			canvas: Background.canvas,
			element: Background.container,
			engine: Background.engine,
			options: {
				showSleeping: true,
				background: '#030333',
				hasBounds: true,
				height: window.innerHeight,
				width: window.innerWidth,
				wireframes: false,
			},
		})

		Background.runner = Matter.Runner.create()

		Background.generatePolaroids()
		Background.renderWorld()
	}


	/**
	 * Generate polaroid images
	 *
	 * @return {void}
	 */
	static generatePolaroids() {
		const count = 0.2 * window.innerWidth

		for ( let i = 0; count >= i; ++i ) {
			Background.polaroids.push( Background.createPolaroid() )
			Background.polaroids = Utils.shuffleArray( Background.polaroids )
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
		Matter.Composite.add( Background.engine.world, Background.polaroids )
		Matter.Render.run( Background.render )
		Matter.Runner.run( Background.runner, Background.engine )
	}


}