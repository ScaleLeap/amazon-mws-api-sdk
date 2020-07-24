import { ParsingError } from '../../src'
import { NextToken } from '../../src/parsing'
import { ScheduleType } from '../../src/sections/reports'
import { createMockHttpClient, mockMwsFail, mockParsingError, parsingErrorRegex } from '../utils'

describe('reports', () => {
  describe('updateReportAcknowledgements', () => {
    const parameters = {
      ReportIdList: [''],
    }

    it('returns count and info of updated reports', async () => {
      expect.assertions(1)

      const mockUpdateReportAcknowledgements = createMockHttpClient(
        'reports_update_report_acknowledgements',
      )

      expect(
        await mockUpdateReportAcknowledgements.reports.updateReportAcknowledgements(parameters),
      ).toMatchSnapshot()
    })

    it('returns count and a list of updated reports', async () => {
      expect.assertions(1)

      const mockUpdateReportAcknowledgements = createMockHttpClient(
        'reports_update_report_acknowledgements_multiple',
      )

      expect(
        await mockUpdateReportAcknowledgements.reports.updateReportAcknowledgements(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response i snt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockParsingError.reports.updateReportAcknowledgements(parameters),
      ).rejects.toThrow(parsingErrorRegex)
    })
  })

  describe('getReportScheduleCount', () => {
    it('returns a count of schedule reports if succesful', async () => {
      expect.assertions(1)

      const mockGetReportScheduleCount = createMockHttpClient('reports_get_report_schedule_count')

      expect(await mockGetReportScheduleCount.reports.getReportScheduleCount()).toMatchSnapshot()
    })

    it('throws a parsing error when the response i snt valid', async () => {
      expect.assertions(1)

      await expect(() => mockParsingError.reports.getReportScheduleCount()).rejects.toThrow(
        parsingErrorRegex,
      )
    })
  })

  describe('getReportScheduleList', () => {
    it('returns detailed information about a report schedule if succesful', async () => {
      expect.assertions(1)

      const mockGetReportScheduleList = createMockHttpClient('reports_get_report_schedule_list')

      expect(await mockGetReportScheduleList.reports.getReportScheduleList()).toMatchSnapshot()
    })

    it('throws a parsing error when the response is nt valid', async () => {
      expect.assertions(1)

      await expect(() => mockParsingError.reports.getReportScheduleList()).rejects.toThrow(
        parsingErrorRegex,
      )
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

      await expect(() => mockParsingError.reports.manageReportSchedule(parameters)).rejects.toThrow(
        parsingErrorRegex,
      )
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
    it('returns report count if succesful', async () => {
      expect.assertions(1)

      const mockGetReportCount = createMockHttpClient('reports_get_report_count')

      expect(await mockGetReportCount.reports.getReportCount()).toMatchSnapshot()
    })

    it('throws a parsing error when the response isn t valid', async () => {
      expect.assertions(1)

      await expect(() => mockParsingError.reports.getReportCount()).rejects.toThrow(
        parsingErrorRegex,
      )
    })
  })

  describe('getReportListByNextToken', () => {
    const mockNextToken = new NextToken('GetReportList', '123')

    it('returns report info and next token if succesful', async () => {
      expect.assertions(1)

      const mockGetReportListByNextToken = createMockHttpClient('reports_get_report_list_nt')

      expect(
        await mockGetReportListByNextToken.reports.getReportListByNextToken(mockNextToken),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response isn t valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockParsingError.reports.getReportListByNextToken(mockNextToken),
      ).rejects.toThrow(parsingErrorRegex)
    })
  })

  describe('getReportList', () => {
    it('should properly return report list for multiple reports', async () => {
      expect.assertions(1)

      const mockGetReportList = createMockHttpClient('reports_get_report_list_multiple')

      expect(await mockGetReportList.reports.getReportList()).toMatchSnapshot()
    })

    it('should properly return report list for a single report', async () => {
      expect.assertions(1)

      const mockGetReportList = createMockHttpClient('reports_get_report_list')

      expect(await mockGetReportList.reports.getReportList()).toMatchSnapshot()
    })

    it('throws a parsing error when the response isnt valid', async () => {
      expect.assertions(1)

      await expect(() => mockParsingError.reports.getReportList()).rejects.toThrow(
        parsingErrorRegex,
      )
    })
  })

  describe('cancelReportRequests', () => {
    it('returns count and detailed info of cancelled requests if succesful', async () => {
      expect.assertions(1)

      const mockCancelReportRequests = createMockHttpClient('reports_cancel_report_requests')

      expect(await mockCancelReportRequests.reports.cancelReportRequests()).toMatchSnapshot()
    })

    it('returns count and detailed info of all cancelled requests if succesful', async () => {
      expect.assertions(1)

      const mockCancelReportRequests = createMockHttpClient(
        'reports_cancel_report_requests_multiple',
      )

      expect(await mockCancelReportRequests.reports.cancelReportRequests()).toMatchSnapshot()
    })

    it('throws a parsing error when the response isnt valid', async () => {
      expect.assertions(1)

      await expect(() => mockParsingError.reports.cancelReportRequests()).rejects.toThrow(
        parsingErrorRegex,
      )
    })
  })

  describe('getReportRequestCount', () => {
    it('returns report request count if succesful', async () => {
      expect.assertions(1)

      const mockGetReportRequestCount = createMockHttpClient('reports_get_report_request_count')

      expect(await mockGetReportRequestCount.reports.getReportRequestCount()).toMatchSnapshot()
    })

    it("throws a parsing error when the response isn't valid", async () => {
      expect.assertions(1)

      await expect(() => mockParsingError.reports.getReportRequestCount()).rejects.toThrow(
        parsingErrorRegex,
      )
    })
  })

  describe('getReportRequestListByNextToken', () => {
    const mockNextToken = new NextToken('GetReportRequestList', '123')

    it('returns report request info if succesful', async () => {
      expect.assertions(1)

      const mockGetReportRequestListByNextToken = createMockHttpClient(
        'reports_get_report_request_list_nt',
      )

      expect(
        await mockGetReportRequestListByNextToken.reports.getReportRequestListByNextToken(
          mockNextToken,
        ),
      ).toMatchSnapshot()
    })

    it("throws a parsing error when the response isn't valid", async () => {
      expect.assertions(1)

      await expect(() =>
        mockParsingError.reports.getReportRequestListByNextToken(mockNextToken),
      ).rejects.toThrow(parsingErrorRegex)
    })
  })

  describe('getReportRequestList', () => {
    it('returns report request info succesfully for responses with a single report', async () => {
      expect.assertions(1)

      const mockGetReportRequestList = createMockHttpClient('reports_get_report_request_list')

      expect(await mockGetReportRequestList.reports.getReportRequestList()).toMatchSnapshot()
    })

    it('returns report request info succesfully for responses with multiple reports', async () => {
      expect.assertions(1)

      const mockGetReportRequestList = createMockHttpClient(
        'reports_get_report_request_list_multiple',
      )

      expect(await mockGetReportRequestList.reports.getReportRequestList()).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockParsingError.reports.getReportRequestList()).rejects.toThrow(
        parsingErrorRegex,
      )
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

      await expect(() => mockParsingError.reports.requestReport(parameters)).rejects.toThrow(
        parsingErrorRegex,
      )
    })
  })
})
