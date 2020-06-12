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

  itci('should succesfully query get report schedule list', async () => {
    const [response] = await reports.getReportScheduleList()

    expect(response).toBeDefined()
  })

  itci('should return new request report', async () => {
    const parameters = {
      ReportType: '_GET_MERCHANT_LISTINGS_ALL_DATA_',
    }

    const [response] = await reports.requestReport(parameters)

    expect(response.ReportRequestId).toBeDefined()
  })

  itci('should succesfully return info on cancelled report requests', async () => {
    const parameters = {
      ReportRequestIdList: ['51783018425', '51784018425'],
    }

    const [response] = await reports.cancelReportRequests(parameters)

    expect(response.Count).toBe(2)
  })

  itci('should succesfully get a count of 2 with 2 valid ids', async () => {
    const parameters = {
      ReportIdList: ['21175694446018424', '21178489344018424'],
      Acknowledged: false,
    }
    const [response] = await reports.updateReportAcknowledgements(parameters)

    expect(response.Count).toBe(2)
  })

  itci('should succesfully get report schedule count', async () => {
    expect.assertions(1)

    const [response] = await reports.getReportScheduleCount()

    expect(typeof response.Count).toBe('number')
  })

  itci('should succesfully get report schedule list', async () => {
    expect.assertions(1)

    const [response] = await reports.getReportScheduleList()

    expect(response).toBeDefined()
  })

  itci('should be able to query get report count', async () => {
    expect.assertions(1)

    const [response] = await reports.getReportCount()

    expect(typeof response.Count).toBe('number')
  })

  itci('should be able to query get report request count', async () => {
    expect.assertions(1)

    const [response] = await reports.getReportRequestCount()

    expect(typeof response.Count).toBe('number')
  })

  itci('should be able to query get report request list', async () => {
    expect.assertions(1)

    const [response] = await reports.getReportRequestList()

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

    const [response] = await reports.getReportList()

    expect(response).toBeDefined()
  })
})
/* eslint-enable jest/no-standalone-expect */
