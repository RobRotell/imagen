import Alpine from 'alpinejs'
import { Polaroid } from './Polaroid'
import { Background } from './Background'


// assigning to window to help browser extensions detect AlpineJS on page
window.Alpine = Alpine


Alpine.data( 'polaroid', () => Polaroid )
Alpine.start()


Background.load()
