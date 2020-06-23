import { boolean, Codec, GetInterface, optional, string } from 'purify-ts'

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
  FeedSubmissionInfo: optional(FeedSubmissionInfo),
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

export class Feeds {
  constructor(private httpClient: HttpClient) {}

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
