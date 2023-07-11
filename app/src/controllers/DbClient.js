import { PrismaClient } from '@prisma/client'


export class DbClient {


	static client = null


	/**
	 * Establish Prisma client
	 *
	 * @return {void}
	 */
	static createClient() {
		if ( null === this.client ) {
			this.client = new PrismaClient()
		}
	}


	/**
	 * Get Prisma client instance
	 *
	 * @return {Object} Prisma client
	 */
	static getClient() {
		if ( null === this.client ) {
			this.createClient()
		}

		return this.client
	}

}
