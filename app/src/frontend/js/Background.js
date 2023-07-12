export class Background {


	static config = {
		particles: {
			number: {
				value: 10,
				density: {
					enable: true,
					value_area: 600,
				},
			},
			color: {
				value: '#04044d',
			},
			shape: {
				type: 'image',
				stroke: {
					width: 0,
					color: '#000',
				},
				// polygon: {
				// nb_sides: 4,
				// },
				image: {
					// eslint-disable-next-line global-require
					src: require( '../img/polaroid.svg' ),
					width: 100,
					height: 100,
				},
			},
			opacity: {
				value: 0.1,
				random: true,
				anim: {
					enable: false,
					speed: 1,
					opacity_min: 0.1,
					sync: false,
				},
			},
			size: {
				value: 160,
				random: true,
				anim: {
					enable: true,
					speed: 10,
					size_min: 40,
					sync: false,
				},
			},
			line_linked: {
				enable: false,
				distance: 200,
				color: '#ffffff',
				opacity: 1,
				width: 2,
			},
			move: {
				enable: true,
				speed: 1.3,
				direction: 'none',
				random: true,
				straight: false,
				out_mode: 'out',
				bounce: false,
				attract: {
					enable: false,
					rotateX: 600,
					rotateY: 1200,
				},
			},
		},
		interactivity: {
			detect_on: 'canvas',
			events: {
				onhover: {
					enable: false,
					mode: 'repulse',
				},
				onclick: {
					enable: false,
					mode: 'push',
				},
				resize: true,
			},
			modes: {
				grab: {
					distance: 400,
					line_linked: {
						opacity: 1,
					},
				},
				bubble: {
					distance: 400,
					size: 40,
					duration: 2,
					opacity: 8,
					speed: 3,
				},
				repulse: {
					distance: 200,
					duration: 0.4,
				},
				push: {
					particles_nb: 4,
				},
				remove: {
					particles_nb: 2,
				},
			},
		},
		retina_detect: true,
	}


	/**
	 * Load ParticlesJS for background
	 *
	 * @return {void}
	 */
	static load() {

		// ParticlesJS library with be bound to window
		import( 'particles.js' ).then( () => {
			window.particlesJS( 'background', Background.config, () => {
				console.log( 'here' )
			})
		})
	}

}
