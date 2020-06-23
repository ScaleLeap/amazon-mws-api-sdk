import { boolean, Codec, GetInterface, optional, unknown } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { nextToken as nextTokenCodec } from '../parsing'

const FEEDS_API_VERSION = '2009-01-01'
interface GetFeedSubmissionListParameters {
  FeedSubmissionIdList?: string[]
  MaxCount?: number
  FeedTypeList?: string[]
  FeedProcessingStatusList?: string[]
  SubmittedFromDate?: Date
  SubmittedToDate?: Date
}

const GetFeedSubmissionList = Codec.interface({
  HasToken: optional(boolean),
  NextToken: optional(nextTokenCodec('GetFeedSubmissionList')),
  FeedSubmissionInfo: optional(unknown),
})

type GetFeedSubmissionList = GetInterface<typeof GetFeedSubmissionList>

const GetFeedSubmissionListResponse = Codec.interface({
  GetFeedSubmissionListResponse: Codec.interface({
    GetFeedSubmissionListResult: GetFeedSubmissionList,
  }),
})

export class Feeds {
  constructor(private httpClient: HttpClient) {}

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
