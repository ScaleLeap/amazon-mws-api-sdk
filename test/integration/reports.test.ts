import { amazonMarketplaces } from '@scaleleap/amazon-marketplaces'

import { HttpClient, Reports } from '../../src'
import { Config } from './config'
import { itci } from './it'

const config = new Config()

const httpClient = new HttpClient({
  marketplace: amazonMarketplaces.CA,
  awsAccessKeyId: config.AWS_ACCESS_KEY_ID,
  mwsAuthToken: config.MWS_AUTH_TOKEN,
  secretKey: config.SECRET_KEY,
  sellerId: config.SELLER_ID,
})

/* eslint-disable jest/no-standalone-expect */
describe('reports', () => {
  const reports = new Reports(httpClient)
  itci('should be able to query get report request list', async () => {
    expect.assertions(1)

    // getReportRequestList with all defaults
    const [response] = await reports.getReportRequestList({})

    expect(response).toBeDefined()
  })
})
/* eslint-enable jest/no-standalone-expect */
