import {
  array,
  boolean,
  Codec,
  exactly,
  GetInterface,
  Left,
  number,
  oneOf,
  optional,
  string,
} from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import {
  ensureString,
  mwsDate,
  NextToken,
  nextToken as nextTokenCodec,
  oneOfEnum,
} from '../parsing'

const REPORTS_API_VERSION = '2009-01-01'
/**
 * List of supported strings.
 * Could probably define an enum for this
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

enum ScheduleEnum {
  _15_MINUTES_ = '_15_MINUTES_',
  _30_MINUTES_ = '_30_MINUTES_',
  _1_HOUR_ = '_1_HOUR_',
  _2_HOURS_ = '_2_HOURS_',
  _4_HOURS_ = '_4_HOURS_',
  _8_HOURS_ = '_8_HOURS_',
  _12_HOURS_ = '_12_HOURS_',
  _1_DAY_ = '_1_DAY_',
  _2_DAYS_ = '_2_DAYS_',
  _72_HOURS_ = '_72_HOURS_',
  _1_WEEK_ = '_1_WEEK_',
  _14_DAYS_ = '_14_DAYS_',
  _15_DAYS_ = '_15_DAYS_',
  _30_DAYS_ = '_30_DAYS_',
  _NEVER_ = '_NEVER_',
}

const ScheduleCodec = oneOfEnum(ScheduleEnum)

export type ScheduleType =
  | '_15_MINUTES_'
  | '_30_MINUTES_'
  | '_1_HOUR_'
  | '_2_HOURS_'
  | '_4_HOURS_'
  | '_8_HOURS_'
  | '_12_HOURS_'
  | '_1_DAY_'
  | '_2_DAYS_'
  | '_72_HOURS_'
  | '_1_WEEK_'
  | '_14_DAYS_'
  | '_15_DAYS_'
  | '_30_DAYS_'
  | '_NEVER_'

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
  ReportRequestInfo: optional(oneOf([array(ReportRequestInfo), ReportRequestInfo, exactly('')])),
  // This does not work for some reason
  // ReportRequestInfo: ensureArray('ReportRequestInfo', ReportRequestInfo),
})

type GetReportRequestListResult = GetInterface<typeof GetReportRequestListResult>

const GetReportRequestListResponse = Codec.interface({
  GetReportRequestListResponse: Codec.interface({
    GetReportRequestListResult,
  }),
})

const GetReportRequestListByNextTokenResponse = Codec.interface({
  GetReportRequestListByNextTokenResponse: Codec.interface({
    GetReportRequestListByNextTokenResult: GetReportRequestListResult,
  }),
})

interface GetReportRequestListByNextTokenParameters {
  NextToken: NextToken<'GetReportRequestList'>
}

interface GetReportRequestCountParameters {
  ReportTypeList?: ReportType[]
  ReportProcessingStatusList?: ReportProcessing[]
  RequestedFromDate?: Date
  RequestedToDate?: Date
}

const GetReportRequestCount = Codec.interface({
  Count: number,
})

const GetReportRequestCountResponse = Codec.interface({
  GetReportRequestCountResponse: Codec.interface({
    GetReportRequestCountResult: GetReportRequestCount,
  }),
})

type GetReportRequestCount = GetInterface<typeof GetReportRequestCount>

interface CancelReportRequestsParameters {
  ReportRequestIdList?: string[]
  ReportTypeList?: ReportType[]
  ReportProcessingStatusList?: ReportProcessing[]
  RequestedFromDate?: Date
  RequestedToDate?: Date
}

const CancelReportRequests = Codec.interface({
  Count: number,
  ReportRequestInfo,
})

const CancelReportRequestsResponse = Codec.interface({
  CancelReportRequestsResponse: Codec.interface({
    CancelReportRequestsResult: CancelReportRequests,
  }),
})

type CancelReportRequests = GetInterface<typeof CancelReportRequests>

interface GetReportListParameters {
  MaxCount?: number
  ReportTypeList?: ReportType[]
  Acknowledged?: boolean
  ReportRequestIdList?: string[]
  AvailableFromDate?: Date
  AvailableToDate?: Date
}

const ReportInfo = Codec.interface({
  ReportId: ensureString,
  ReportType: optional(ReportType),
  ReportRequestId: optional(ensureString),
  AvailableDate: optional(mwsDate),
  Acknowledged: optional(boolean),
  AcknowledgedDate: optional(mwsDate),
})

const GetReportListResult = Codec.interface({
  NextToken: optional(nextTokenCodec('GetReportList')),
  HasNext: optional(boolean),
  ReportInfo: optional(oneOf([array(ReportInfo), ReportInfo, exactly('')])),
})

const GetReportListResponse = Codec.interface({
  GetReportListResponse: Codec.interface({
    GetReportListResult,
  }),
})

interface GetReportListByNextTokenParameters {
  NextToken: NextToken<'GetReportList'>
}

const GetReportListByNextTokenResponse = Codec.interface({
  GetReportListByNextTokenResponse: Codec.interface({
    GetReportListByNextTokenResult: GetReportListResult,
  }),
})

type GetReportListResult = GetInterface<typeof GetReportListResult>

const GetReportCount = Codec.interface({
  Count: number,
})

const GetReportCountResponse = Codec.interface({
  GetReportCountResponse: Codec.interface({
    GetReportCountResult: GetReportCount,
  }),
})

interface GetReportCountParameters {
  ReportTypeList?: ReportType[]
  Acknowledged?: boolean
  AvailableFromDate?: Date
  AvailableToDate?: Date
}

const GetReportResponse = Codec.custom<string>({
  decode: (report) => {
    if (typeof report === 'string' && report.length > 0) {
      return string.decode(report)
    }

    return Left('Expected report to have length of more than 0')
  },
  encode: (report) => report,
})

type Report = string

type GetReportCount = GetInterface<typeof GetReportCount>

interface ManageReportScheduleParameters {
  ReportType: ReportType
  Schedule: ScheduleType
  ScheduleDate?: Date
}

const ReportSchedule = Codec.interface({
  ReportType: optional(ReportType),
  Schedule: optional(ScheduleCodec),
  ScheduleDate: optional(mwsDate),
})

const ManageReportSchedule = Codec.interface({
  Count: number,
  ReportSchedule: optional(ReportSchedule),
})

type ManageReportSchedule = GetInterface<typeof ManageReportSchedule>

const ManageReportScheduleResponse = Codec.interface({
  ManageReportScheduleResponse: Codec.interface({
    ManageReportScheduleResult: ManageReportSchedule,
  }),
})

interface GetReportScheduleListParameters {
  ReportTypeList?: ReportType[]
}

const GetReportScheduleList = Codec.interface({
  NextToken: optional(nextTokenCodec('GetReportScheduleList')),
  HasNext: optional(boolean),
  ReportSchedule: optional(ReportSchedule),
})

type GetReportScheduleList = GetInterface<typeof GetReportScheduleList>

const GetReportScheduleListResponse = Codec.interface({
  GetReportScheduleListResponse: Codec.interface({
    GetReportScheduleListResult: GetReportScheduleList,
  }),
})

export class Reports {
  constructor(private httpClient: HttpClient) {}

  /**
   * getReportScheduleListByNextToken cannot be called
   * http://docs.developer.amazonservices.com/en_CA/reports/Reports_GetReportScheduleListByNextToken.html
   */

  async getReportScheduleList(
    parameters: GetReportScheduleListParameters,
  ): Promise<[GetReportScheduleList, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Reports,
      version: REPORTS_API_VERSION,
      action: 'GetReportScheduleList',
      parameters: {
        'ReportTypeList.Type': parameters.ReportTypeList,
      },
    })

    return GetReportScheduleListResponse.decode(response).caseOf({
      Right: (x) => [x.GetReportScheduleListResponse.GetReportScheduleListResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async manageReportSchedule(
    parameters: ManageReportScheduleParameters,
  ): Promise<[ManageReportSchedule, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Reports,
      version: REPORTS_API_VERSION,
      action: 'ManageReportSchedule',
      parameters: {
        ReportType: parameters.ReportType,
        Schedule: parameters.Schedule,
        ScheduleDate: parameters.ScheduleDate?.toISOString(),
      },
    })

    return ManageReportScheduleResponse.decode(response).caseOf({
      Right: (x) => [x.ManageReportScheduleResponse.ManageReportScheduleResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getReport(parameters: { ReportId: string }): Promise<[Report, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Reports,
      version: REPORTS_API_VERSION,
      action: 'GetReport',
      parameters,
    })

    return GetReportResponse.decode(response).caseOf({
      Right: (x) => [x, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getReportCount(
    parameters: GetReportCountParameters,
  ): Promise<[GetReportCount, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Reports,
      version: REPORTS_API_VERSION,
      action: 'GetReportCount',
      parameters: {
        'ReportTypeList.Type': parameters.ReportTypeList,
        Acknowledged: parameters.Acknowledged,
        AvailableFromDate: parameters.AvailableFromDate?.toISOString(),
        AvailableToDate: parameters.AvailableToDate?.toISOString(),
      },
    })

    return GetReportCountResponse.decode(response).caseOf({
      Right: (x) => [x.GetReportCountResponse.GetReportCountResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getReportListByNextToken(
    parameters: GetReportListByNextTokenParameters,
  ): Promise<[GetReportListResult, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Reports,
      version: REPORTS_API_VERSION,
      action: 'GetReportListByNextToken',
      parameters: {
        NextToken: parameters.NextToken.token,
      },
    })

    return GetReportListByNextTokenResponse.decode(response).caseOf({
      Right: (x) => [x.GetReportListByNextTokenResponse.GetReportListByNextTokenResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getReportList(
    parameters: GetReportListParameters,
  ): Promise<[GetReportListResult, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Reports,
      version: REPORTS_API_VERSION,
      action: 'GetReportList',
      parameters: {
        MaxCount: parameters.MaxCount,
        'ReportTypeList.Type': parameters.ReportTypeList,
        Acknowledged: parameters.Acknowledged,
        'ReportRequestIdList.Id': parameters.ReportRequestIdList,
        AvailableFromDate: parameters.AvailableFromDate?.toISOString(),
        AvailableToDate: parameters.AvailableToDate?.toISOString(),
      },
    })

    return GetReportListResponse.decode(response).caseOf({
      Right: (x) => [x.GetReportListResponse.GetReportListResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async cancelReportRequests(
    parameters: CancelReportRequestsParameters,
  ): Promise<[CancelReportRequests, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Reports,
      version: REPORTS_API_VERSION,
      action: 'CancelReportRequests',
      parameters: {
        'ReportRequestIdList.Id': parameters.ReportRequestIdList,
        'ReportTypeList.Type': parameters.ReportTypeList,
        'ReportProcessingStatusList.Status': parameters.ReportProcessingStatusList,
        RequestedFromDate: parameters.RequestedFromDate?.toISOString(),
        RequestedToDate: parameters.RequestedToDate?.toISOString(),
      },
    })

    return CancelReportRequestsResponse.decode(response).caseOf({
      Right: (x) => [x.CancelReportRequestsResponse.CancelReportRequestsResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getReportRequestCount(
    parameters: GetReportRequestCountParameters,
  ): Promise<[GetReportRequestCount, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Reports,
      version: REPORTS_API_VERSION,
      action: 'GetReportRequestCount',
      parameters: {
        'ReportTypeList.Type': parameters.ReportTypeList,
        'ReportProcessingStatusList.Status': parameters.ReportProcessingStatusList,
        RequestedFromDate: parameters.RequestedFromDate?.toISOString(),
        RequestedToDate: parameters.RequestedToDate?.toISOString(),
      },
    })

    return GetReportRequestCountResponse.decode(response).caseOf({
      Right: (x) => [x.GetReportRequestCountResponse.GetReportRequestCountResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getReportRequestListByNextToken(
    parameters: GetReportRequestListByNextTokenParameters,
  ): Promise<[GetReportRequestListResult, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Reports,
      version: REPORTS_API_VERSION,
      action: 'GetReportListByNextToken',
      parameters: {
        NextToken: parameters.NextToken.token,
      },
    })

    return GetReportRequestListByNextTokenResponse.decode(response).caseOf({
      Right: (x) => [
        x.GetReportRequestListByNextTokenResponse.GetReportRequestListByNextTokenResult,
        meta,
      ],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getReportRequestList(
    parameters: GetReportRequestListParameters,
  ): Promise<[GetReportRequestListResult, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Reports,
      version: REPORTS_API_VERSION,
      action: 'GetReportRequestList',
      parameters: {
        'ReportRequestIdList.Id': parameters.ReportRequestIdList,
        'ReportTypeList.Type': parameters.ReportTypeList,
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
      resource: Resource.Reports,
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
}
