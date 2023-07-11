import Alpine from 'alpinejs'
import Polaroid from './app'
import { Floor } from './floor'


// assigning to window to help browser extensions detect AlpineJS on page
window.Alpine = Alpine


Alpine.data( 'polaroid', Polaroid )
Alpine.start()


Floor.init()
