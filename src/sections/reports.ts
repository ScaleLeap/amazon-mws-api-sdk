import { boolean, Codec, GetInterface, optional, string } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { ensureString, mwsDate } from '../parsing'
import { getServiceStatusByResource } from './shared'

const REPORTS_API_VERSION = '2009-01-01'
/**
 * List of supported strings
 * Should probably define an enum for this
 * http://docs.developer.amazonservices.com/en_CA/reports/Reports_ReportType.html#ReportTypeCategories__ListingsReports
 */
const ReportType = string
type ReportType = GetInterface<typeof ReportType>
interface RequestReportParameters {
  ReportType: ReportType
  StartDate?: Date
  EndDate?: Date
  ReportOptions?: string
  MarketplaceIdList?: string[]
}

// Amazon does not explicitlye define which elements of the response are required so everything is optional for now
const ReportRequestInfo = Codec.interface({
  ReportRequestId: ensureString,
  ReportType: optional(ReportType),
  StartDate: optional(mwsDate),
  EndDate: optional(mwsDate),
  Scheduled: optional(boolean),
  SubmittedDate: optional(mwsDate),
  ReportProcessingStatus: optional(string),
  GeneratedReportId: optional(string),
  StartedProcessingDate: optional(mwsDate),
  CompletedDate: optional(mwsDate),
})

type ReportRequestInfo = GetInterface<typeof ReportRequestInfo>

const RequestReportResponse = Codec.interface({
  RequestReportResponse: Codec.interface({
    RequestReportResult: Codec.interface({
      ReportRequestInfo,
    }),
  }),
})

export class Reports {
  constructor(private httpClient: HttpClient) {}

  async requestReport(
    parameters: RequestReportParameters,
  ): Promise<[ReportRequestInfo, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Report,
      version: REPORTS_API_VERSION,
      action: 'RequestReport',
      parameters: {
        ReportType: parameters.ReportType,
        StartDate: parameters.StartDate?.toISOString(),
        EndDate: parameters.EndDate?.toISOString(),
        ReportOptions: parameters.ReportOptions,
        'MarketplaceIdList.Id': parameters.MarketplaceIdList,
      },
    })

    return RequestReportResponse.decode(response).caseOf({
      Right: (x) => [x.RequestReportResponse.RequestReportResult.ReportRequestInfo, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getServiceStatus() {
    return getServiceStatusByResource(this.httpClient, Resource.Report, REPORTS_API_VERSION)
  }
}
