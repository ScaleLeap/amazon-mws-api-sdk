import crypto from 'crypto'
import {
  array,
  boolean,
  Codec,
  enumeration,
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
import { ensureString, mwsDate, NextToken, nextToken as nextTokenCodec } from '../parsing'

const FEEDS_API_VERSION = '2009-01-01'
export interface GetFeedSubmissionListParameters {
  FeedSubmissionIdList?: string[]
  MaxCount?: number
  FeedTypeList?: FeedType[]
  FeedProcessingStatusList?: FeedProcessingStatus[]
  SubmittedFromDate?: Date
  SubmittedToDate?: Date
}
enum FeedProcessingStatusEnum {
  _AWAITING_ASYNCHRONOUS_REPLY_ = '_AWAITING_ASYNCHRONOUS_REPLY_',
  _CANCELLED_ = '_CANCELLED_',
  _DONE_ = '_DONE_',
  _IN_PROGRESS_ = '_IN_PROGRESS_',
  _IN_SAFETY_NET_ = '_IN_SAFETY_NET_',
  _SUBMITTED_ = '_SUBMITTED_',
  _UNCONFIRMED_ = '_UNCONFIRMED_',
}

const FeedProcessingStatusCodec = enumeration(FeedProcessingStatusEnum)

const FeedSubmissionInfo = Codec.interface({
  FeedSubmissionId: ensureString,
  FeedType: string,
  SubmittedDate: mwsDate,
  FeedProcessingStatus: FeedProcessingStatusCodec,
  StartedProcessingDate: optional(mwsDate),
  CompletedProcessingDate: optional(mwsDate),
})

export const GetFeedSubmissionList = Codec.interface({
  HasToken: optional(boolean),
  NextToken: optional(nextTokenCodec('GetFeedSubmissionList')),
  FeedSubmissionInfo: optional(oneOf([FeedSubmissionInfo, array(FeedSubmissionInfo), exactly('')])),
})

export type GetFeedSubmissionList = GetInterface<typeof GetFeedSubmissionList>

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
  | '_POST_EASYSHIP_DOCUMENTS_'

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

export const GetFeedSubmissionCount = Codec.interface({
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
  FeedTypeList?: FeedType[]
  SubmittedFromDate?: Date
  SubmittedToDate?: Date
}

export const CancelFeedSubmissions = Codec.interface({
  Count: number,
  FeedSubmissionInfo: optional(oneOf([FeedSubmissionInfo, array(FeedSubmissionInfo), exactly('')])),
})

export type CancelFeedSubmissions = GetInterface<typeof CancelFeedSubmissions>

const CancelFeedSubmissionsResponse = Codec.interface({
  CancelFeedSubmissionsResponse: Codec.interface({
    CancelFeedSubmissionsResult: CancelFeedSubmissions,
  }),
})

export const FeedSubmission = string

export type FeedSubmission = GetInterface<typeof FeedSubmission>

const GetFeedSubmissionResultResponse = Codec.custom<string>({
  decode: (feed) => {
    if (typeof feed === 'string' && feed.length > 0) {
      return string.decode(feed)
    }

    return Left('Expected feed to have length of more than 0')
  },
  encode: (feed) => feed,
})

export interface GetFeedSubmissionResultParameters {
  FeedSubmissionId: string
}

export interface SubmitFeedParameters {
  FeedContent: string
  FeedType: FeedType
  MarketplaceIdList?: string[]
  PurgeAndReplace?: boolean
  AmazonOrderId?: string
  DocumentId?: string
}

export const SubmitFeed = Codec.interface({
  FeedSubmissionInfo: optional(oneOf([FeedSubmissionInfo, array(FeedSubmissionInfo), exactly('')])),
})

export type SubmitFeed = GetInterface<typeof SubmitFeed>

const SubmitFeedResponse = Codec.interface({
  SubmitFeedResponse: Codec.interface({
    SubmitFeedResult: SubmitFeed,
  }),
})

export class Feeds {
  constructor(private httpClient: HttpClient) {}

  async submitFeed(parameters: SubmitFeedParameters): Promise<[SubmitFeed, RequestMeta]> {
    const hash = crypto.createHash('md5').update(parameters.FeedContent).digest('base64')

    const [response, meta] = await this.httpClient.request(
      'POST',
      {
        resource: Resource.Feeds,
        version: FEEDS_API_VERSION,
        action: 'SubmitFeed',
        parameters: {
          FeedType: parameters.FeedType,
          'MarketplaceIdList.Id': parameters.MarketplaceIdList,
          PurgeAndReplace: parameters.PurgeAndReplace,
          AmazonOrderId: parameters.AmazonOrderId,
          DocumentId: parameters.DocumentId,
          ContentMD5Value: hash,
        },
      },
      parameters.FeedContent,
    )

    return SubmitFeedResponse.decode(response).caseOf({
      Right: (x) => [x.SubmitFeedResponse.SubmitFeedResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getFeedSubmissionResult(
    parameters: GetFeedSubmissionResultParameters,
  ): Promise<[FeedSubmission, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Feeds,
      version: FEEDS_API_VERSION,
      action: 'GetFeedSubmissionResult',
      parameters: {
        FeedSubmissionId: parameters.FeedSubmissionId,
      },
    })

    return GetFeedSubmissionResultResponse.decode(response).caseOf({
      Right: (x) => [x, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

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
      action: 'GetFeedSubmissionCount',
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
