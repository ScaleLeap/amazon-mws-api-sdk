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
  itci('should be able to query get report count', async () => {
    expect.assertions(1)

    const [response] = await reports.getReportCount({})

    expect(typeof response.Count).toBe('number')
  })

  itci('should be able to query get report request count', async () => {
    expect.assertions(1)

    const [response] = await reports.getReportRequestCount({})

    expect(typeof response.Count).toBe('number')
  })

  itci('should be able to query get report request list', async () => {
    expect.assertions(1)

    const [response] = await reports.getReportRequestList({})

    expect(response).toBeDefined()
  })

  itci('should be able to request a report', async () => {
    expect.assertions(2)

    const [response] = await reports.getReport({ ReportId: '20812705939018404' })

    expect(typeof response).toBe('string')
    expect(response).toContain('settlement-id')
  })

  itci('should be able to query get report list', async () => {
    expect.assertions(1)

    const [response] = await reports.getReportList({})

    expect(response).toBeDefined()
  })
})
/* eslint-enable jest/no-standalone-expect */
