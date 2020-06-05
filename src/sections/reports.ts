import { boolean, Codec, GetInterface, optional, string } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { ensureString, mwsDate, nextToken as nextTokenCodec } from '../parsing'
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
  GeneratedReportId: optional(ensureString),
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

type ReportProcessing =
  | '_SUBMITTED_'
  | '_IN_PROGRESS_'
  | '_CANCELLED_'
  | '_DONE_'
  | '_DONE_NO_DATA_'
  | 'All'
interface GetReportRequestListParameters {
  ReportRequestIdList?: string[]
  ReportTypeList?: ReportType[]
  ReportProcessingStatusList?: ReportProcessing[]
  MaxCount?: number
  RequestedFromDate?: Date
  RequestedToDate?: Date
}

const GetReportRequestListResult = Codec.interface({
  NextToken: optional(nextTokenCodec('GetReportRequestList')),
  HasNext: optional(boolean),
  ReportRequestInfo: optional(ReportRequestInfo),
})

type GetReportRequestListResult = GetInterface<typeof GetReportRequestListResult>

const GetReportRequestListResponse = Codec.interface({
  GetReportRequestListResponse: Codec.interface({
    GetReportRequestListResult,
  }),
})

export class Reports {
  constructor(private httpClient: HttpClient) {}

  async getReportRequestList(
    parameters: GetReportRequestListParameters,
  ): Promise<[GetReportRequestListResult, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Report,
      version: REPORTS_API_VERSION,
      action: 'GetReportRequestList',
      parameters: {
        'ReportRequestIdList.Id': parameters.ReportRequestIdList,
        'ReportTypeList.Type': parameters.ReportRequestIdList,
        'ReportProcessingStatusList.Status': parameters.ReportProcessingStatusList,
        MaxCount: parameters.MaxCount,
        RequestedFromDate: parameters.RequestedFromDate?.toISOString(),
        RequestedToDate: parameters.RequestedToDate?.toISOString(),
      },
    })

    return GetReportRequestListResponse.decode(response).caseOf({
      Right: (x) => [x.GetReportRequestListResponse.GetReportRequestListResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

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
