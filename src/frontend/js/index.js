import Alpine from 'alpinejs'
import Imagen from './app'


// assigning to window to help browser extensions detect AlpineJS on page
window.Alpine = Alpine


Alpine.data( 'imagen', Imagen )
Alpine.start()
