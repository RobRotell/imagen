import { createHash } from 'node:crypto'


/**
 * Hash value
 *
 * @param {string} val
 * @param {string} algo
 *
 * @return {string}
 */
// eslint-disable-next-line arrow-body-style
export const hashValue = ( val, algo = 'sha256' ) => {
	return createHash( algo ).update( val ).digest( 'hex' )
}
