import { PrismaClient } from '@prisma/client'


export class DbClient {


	static client = null


	/**
	 * Establish Prisma client
	 *
	 * @return {void}
	 */
	static createClient() {
		if ( null === DbClient.client ) {
			DbClient.client = new PrismaClient()
		}
	}


	/**
	 * Get Prisma client instance
	 *
	 * @return {Object} Prisma client
	 */
	static getClient() {
		if ( null === DbClient.client ) {
			DbClient.createClient()
		}

		return DbClient.client
	}

}
