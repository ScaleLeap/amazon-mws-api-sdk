import { amazonMarketplaces, HttpClient, ParsingError } from '../../src'
import { MWS } from '../../src/mws'
import { NextToken } from '../../src/parsing'
import { ScheduleType } from '../../src/sections/reports'
import { getFixture } from '../utils'

const httpConfig = {
  awsAccessKeyId: '',
  marketplace: amazonMarketplaces.CA,
  mwsAuthToken: '',
  secretKey: '',
  sellerId: '',
}

const headers = {
  'x-mws-request-id': '0',
  'x-mws-timestamp': '2020-05-06T09:22:23.582Z',
  'x-mws-quota-max': '1000',
  'x-mws-quota-remaining': '999',
  'x-mws-quota-resetson': '2020-04-06T10:22:23.582Z',
}

const parsingError = 'Expected an object, but received a string with value ""'

const createMockHttpClient = (fixture: string) =>
  new MWS(
    new HttpClient(httpConfig, () =>
      Promise.resolve({
        data: getFixture(fixture),
        headers,
      }),
    ),
  )

const mockMwsFail = new MWS(
  new HttpClient(httpConfig, () => Promise.resolve({ data: '', headers: {} })),
)

describe('reports', () => {
  describe('getReportScheduleList', () => {
    const parameters = {}

    it('returns detailed information about a report schedule if succesful', async () => {
      expect.assertions(1)

      const mockGetReportScheduleList = createMockHttpClient('reports_get_report_schedule_list')

      expect(
        await mockGetReportScheduleList.reports.getReportScheduleList(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response is nt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.reports.getReportScheduleList(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('manageReportSchedule', () => {
    const parameters = {
      ReportType: '_GET_ORDERS_DATA_',
      Schedule: '_30_DAYS_' as ScheduleType,
    }

    it('returns count and report schedule if succesful', async () => {
      expect.assertions(1)

      const mockManageReportSchedule = createMockHttpClient('reports_manage_report_schedule')

      expect(
        await mockManageReportSchedule.reports.manageReportSchedule(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response is nt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.reports.manageReportSchedule(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getReport', () => {
    const parameters = {
      ReportId: '',
    }

    it('returns a report if succesful', async () => {
      expect.assertions(1)

      /**
       * This isn't an XML file, but I thought it'd be fine to reuse getFixture
       */
      const mockGetReport = createMockHttpClient('reports_get_report')

      expect(await mockGetReport.reports.getReport(parameters)).toMatchSnapshot()
    })

    it('throws a custom error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.reports.getReport(parameters)).rejects.toStrictEqual(
        new ParsingError('Expected report to have length of more than 0'),
      )
    })
  })

  describe('getReportCount', () => {
    const parameters = {}

    it('returns report count if succesful', async () => {
      expect.assertions(1)

      const mockGetReportCount = createMockHttpClient('reports_get_report_count')

      expect(await mockGetReportCount.reports.getReportCount(parameters)).toMatchSnapshot()
    })

    it('throws a parsing error when the response isn t valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.reports.getReportCount(parameters)).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })

  describe('getReportListByNextToken', () => {
    const mockNextToken = new NextToken('GetReportList', '123')
    const parameters = {
      NextToken: mockNextToken,
    }

    it('returns report info and next token if succesful', async () => {
      expect.assertions(1)

      const mockGetReportListByNextToken = createMockHttpClient('reports_get_report_list_nt')

      expect(
        await mockGetReportListByNextToken.reports.getReportListByNextToken(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response isn t valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.reports.getReportListByNextToken(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getReportList', () => {
    const parameters = {}

    it('should properly return report list for multiple reports', async () => {
      expect.assertions(1)

      const mockGetReportList = createMockHttpClient('reports_get_report_list_multiple')

      expect(await mockGetReportList.reports.getReportList(parameters)).toMatchSnapshot()
    })

    it('should properly return report list for a single report', async () => {
      expect.assertions(1)

      const mockGetReportList = createMockHttpClient('reports_get_report_list')

      expect(await mockGetReportList.reports.getReportList(parameters)).toMatchSnapshot()
    })

    it('throws a parsing error when the response isnt valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.reports.getReportList(parameters)).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })

  describe('cancelReportRequests', () => {
    const parameters = {}

    it('returns count and detailed info of cancelled requests if succesful', async () => {
      expect.assertions(1)

      const mockCancelReportRequests = createMockHttpClient('reports_cancel_report_requests')

      expect(
        await mockCancelReportRequests.reports.cancelReportRequests(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response isnt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.reports.cancelReportRequests(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getReportRequestCount', () => {
    const parameters = {}

    it('returns report request count if succesful', async () => {
      expect.assertions(1)

      const mockGetReportRequestCount = createMockHttpClient('reports_get_report_request_count')

      expect(
        await mockGetReportRequestCount.reports.getReportRequestCount(parameters),
      ).toMatchSnapshot()
    })

    it("throws a parsing error when the response isn't valid", async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.reports.getReportRequestCount(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getReportRequestListByNextToken', () => {
    const mockNextToken = new NextToken('GetReportRequestList', '123')
    const parameters = {
      NextToken: mockNextToken,
    }

    it('returns report request info if succesful', async () => {
      expect.assertions(1)

      const mockGetReportRequestListByNextToken = createMockHttpClient(
        'reports_get_report_request_list_nt',
      )

      expect(
        await mockGetReportRequestListByNextToken.reports.getReportRequestListByNextToken(
          parameters,
        ),
      ).toMatchSnapshot()
    })

    it("throws a parsing error when the response isn't valid", async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.reports.getReportRequestListByNextToken(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getReportRequestList', () => {
    const parameters = {}

    it('returns report request info succesfully for responses with a single report', async () => {
      expect.assertions(1)

      const mockGetReportRequestList = createMockHttpClient('reports_get_report_request_list')

      expect(
        await mockGetReportRequestList.reports.getReportRequestList(parameters),
      ).toMatchSnapshot()
    })

    it('returns report request info succesfully for responses with multiple reports', async () => {
      expect.assertions(1)

      const mockGetReportRequestList = createMockHttpClient(
        'reports_get_report_request_list_multiple',
      )

      expect(
        await mockGetReportRequestList.reports.getReportRequestList(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.reports.getReportRequestList(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('requestReport', () => {
    const parameters = {
      ReportType: '',
    }

    it('returns a parsed model when the response is valid', async () => {
      expect.assertions(1)

      const mockRequestReport = createMockHttpClient('reports_request_report')

      expect(await mockRequestReport.reports.requestReport(parameters)).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.reports.requestReport(parameters)).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })
})
