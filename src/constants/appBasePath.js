import { dirname } from 'path'
import { fileURLToPath } from 'url'


// todo -- obviously, there's gotta be a better way to do this
export const appBasePath = dirname( dirname( dirname( fileURLToPath( import.meta.url ) ) ) )
