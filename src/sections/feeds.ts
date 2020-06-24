import {
  array,
  boolean,
  Codec,
  exactly,
  GetInterface,
  number,
  oneOf,
  optional,
  string,
} from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { ensureString, mwsDate, NextToken, nextToken as nextTokenCodec } from '../parsing'

const FEEDS_API_VERSION = '2009-01-01'
interface GetFeedSubmissionListParameters {
  FeedSubmissionIdList?: string[]
  MaxCount?: number
  FeedTypeList?: string[]
  FeedProcessingStatusList?: string[]
  SubmittedFromDate?: Date
  SubmittedToDate?: Date
}

const FeedSubmissionInfo = Codec.interface({
  FeedSubmissionId: ensureString,
  FeedType: string,
  SubmittedDate: mwsDate,
  FeedProcessingStatus: string,
  StartedProcessingDate: optional(mwsDate),
  CompletedProcessingDate: optional(mwsDate),
})

const GetFeedSubmissionList = Codec.interface({
  HasToken: optional(boolean),
  NextToken: optional(nextTokenCodec('GetFeedSubmissionList')),
  FeedSubmissionInfo: oneOf([FeedSubmissionInfo, array(FeedSubmissionInfo), exactly('')]),
})

type GetFeedSubmissionList = GetInterface<typeof GetFeedSubmissionList>

const GetFeedSubmissionListResponse = Codec.interface({
  GetFeedSubmissionListResponse: Codec.interface({
    GetFeedSubmissionListResult: GetFeedSubmissionList,
  }),
})

const GetFeedSubmissionListByNextTokenResponse = Codec.interface({
  GetFeedSubmissionListByNextTokenResponse: Codec.interface({
    GetFeedSubmissionListByNextTokenResult: GetFeedSubmissionList,
  }),
})

export type FeedType =
  | '_POST_PRODUCT_DATA_'
  | '_POST_INVENTORY_AVAILABILITY_DATA_'
  | '_POST_PRODUCT_OVERRIDES_DATA_'
  | '_POST_PRODUCT_PRICING_DATA_'
  | '_POST_PRODUCT_IMAGE_DATA_'
  | '_POST_PRODUCT_RELATIONSHIP_DATA_'
  | '_POST_FLAT_FILE_INVLOADER_DATA_'
  | '_POST_FLAT_FILE_LISTINGS_DATA_'
  | '_POST_FLAT_FILE_BOOKLOADER_DATA_'
  | '_POST_FLAT_FILE_CONVERGENCE_LISTINGS_DATA_'
  | '_POST_FLAT_FILE_LISTINGS_DATA_'
  | '_POST_FLAT_FILE_PRICEANDQUANTITYONLY_UPDATE_DATA_'
  | '_POST_UIEE_BOOKLOADER_DATA_'
  | '_POST_STD_ACES_DATA_'
  | '_POST_ORDER_ACKNOWLEDGEMENT_DATA_'
  | '_POST_PAYMENT_ADJUSTMENT_DATA_'
  | '_POST_ORDER_FULFILLMENT_DATA_'
  | '_POST_INVOICE_CONFIRMATION_DATA_'
  | '_POST_EXPECTED_SHIP_DATE_SOD_'
  | '_POST_FLAT_FILE_ORDER_ACKNOWLEDGEMENT_DATA_'
  | '_POST_FLAT_FILE_PAYMENT_ADJUSTMENT_DATA_'
  | '_POST_FLAT_FILE_FULFILLMENT_DATA_'
  | '_POST_EXPECTED_SHIP_DATE_SOD_FLAT_FILE_'
  | '_POST_FULFILLMENT_ORDER_REQUEST_DATA_'
  | '_POST_FULFILLMENT_ORDER_CANCELLATION_REQUEST_DATA_'
  | '_POST_FBA_INBOUND_CARTON_CONTENTS_'
  | '_POST_FLAT_FILE_FULFILLMENT_ORDER_REQUEST_DATA_'
  | '_POST_FLAT_FILE_FULFILLMENT_ORDER_CANCELLATION_REQUEST_DATA_'
  | '_POST_FLAT_FILE_FBA_CREATE_INBOUND_PLAN_'
  | '_POST_FLAT_FILE_FBA_UPDATE_INBOUND_PLAN_'
  | '_POST_FLAT_FILE_FBA_CREATE_REMOVAL_'
  | '_RFQ_UPLOAD_FEED_'
  | '	_POST_EASYSHIP_DOCUMENTS_'

export type FeedProcessingStatus =
  | '_AWAITING_ASYNCHRONOUS_REPLY_'
  | '_CANCELLED_'
  | '_DONE_'
  | '_IN_PROGRESS_'
  | '_IN_SAFETY_NET_'
  | '_SUBMITTED_'
  | '_UNCONFIRMED_'

export interface GetFeedSubmissionCountParameters {
  FeedTypeList?: FeedType[]
  FeedProcessingStatusList?: FeedProcessingStatus[]
  SubmittedFromDate?: Date
  SubmittedToDate?: Date
}

const GetFeedSubmissionCount = Codec.interface({
  Count: number,
})

export type GetFeedSubmissionCount = GetInterface<typeof GetFeedSubmissionCount>

const GetFeedSubmissionCountResponse = Codec.interface({
  GetFeedSubmissionCountResponse: Codec.interface({
    GetFeedSubmissionCountResult: GetFeedSubmissionCount,
  }),
})

export interface CancelFeedSubmissionsParameters {
  FeedSubmissionIdList?: string[]
  FeedTypeList?: string[]
  SubmittedFromDate?: Date
  SubmittedToDate?: Date
}

const CancelFeedSubmissions = Codec.interface({
  Count: number,
  FeedSubmissionInfo: oneOf([FeedSubmissionInfo, array(FeedSubmissionInfo), exactly('')]),
})

export type CancelFeedSubmissions = GetInterface<typeof CancelFeedSubmissions>

const CancelFeedSubmissionsResponse = Codec.interface({
  CancelFeedSubmissionsResponse: Codec.interface({
    CancelFeedSubmissionsResult: CancelFeedSubmissions,
  }),
})

export class Feeds {
  constructor(private httpClient: HttpClient) {}

  async cancelFeedSubmissions(
    parameters: CancelFeedSubmissionsParameters = {},
  ): Promise<[CancelFeedSubmissions, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Feeds,
      version: FEEDS_API_VERSION,
      action: 'CancelFeedSubmissions',
      parameters: {
        'FeedSubmissionIdList.Id': parameters.FeedSubmissionIdList,
        'FeedTypeList.Type': parameters.FeedTypeList,
        SubmittedFromDate: parameters.SubmittedFromDate?.toISOString(),
        SubmittedToDate: parameters.SubmittedToDate?.toISOString(),
      },
    })

    return CancelFeedSubmissionsResponse.decode(response).caseOf({
      Right: (x) => [x.CancelFeedSubmissionsResponse.CancelFeedSubmissionsResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getFeedSubmissionCount(
    parameters: GetFeedSubmissionCountParameters = {},
  ): Promise<[GetFeedSubmissionCount, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Feeds,
      version: FEEDS_API_VERSION,
      action: 'GetFeedSubmissionListByNextToken',
      parameters: {
        'FeedTypeList.Type': parameters.FeedTypeList,
        'FeedProcessingStatusList.Status': parameters.FeedProcessingStatusList,
        SubmittedFromDate: parameters.SubmittedFromDate?.toISOString(),
        SubmittedToDate: parameters.SubmittedToDate?.toISOString(),
      },
    })

    return GetFeedSubmissionCountResponse.decode(response).caseOf({
      Right: (x) => [x.GetFeedSubmissionCountResponse.GetFeedSubmissionCountResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getFeedSubmissionListByNextToken(
    nextToken: NextToken<'GetFeedSubmissionList'>,
  ): Promise<[GetFeedSubmissionList, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Feeds,
      version: FEEDS_API_VERSION,
      action: 'GetFeedSubmissionListByNextToken',
      parameters: {
        NextToken: nextToken.token,
      },
    })

    return GetFeedSubmissionListByNextTokenResponse.decode(response).caseOf({
      Right: (x) => [
        x.GetFeedSubmissionListByNextTokenResponse.GetFeedSubmissionListByNextTokenResult,
        meta,
      ],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getFeedSubmissionList(
    parameters: GetFeedSubmissionListParameters = {},
  ): Promise<[GetFeedSubmissionList, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Feeds,
      version: FEEDS_API_VERSION,
      action: 'GetFeedSubmissionList',
      parameters: {
        'FeedSubmissionIdList.Id': parameters.FeedSubmissionIdList,
        MaxCount: parameters.MaxCount,
        'FeedTypeList.Type': parameters.FeedTypeList,
        'FeedProcessingStatusList.Status': parameters.FeedProcessingStatusList,
        SubmittedFromDate: parameters.SubmittedFromDate?.toISOString(),
        SubmittedToDate: parameters.SubmittedToDate?.toISOString(),
      },
    })

    return GetFeedSubmissionListResponse.decode(response).caseOf({
      Right: (x) => [x.GetFeedSubmissionListResponse.GetFeedSubmissionListResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }
}
