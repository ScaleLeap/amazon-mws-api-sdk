import { ParsingError } from '../../error'
import { HttpClient, RequestMeta, Resource } from '../../http'
import { NextToken } from '../../parsing'
import { getServiceStatusByResource } from '../shared'
import { RequireOnlyOne } from '../types'
import {
  ListFinancialEventGroups,
  ListFinancialEventGroupsByNextTokenResponse,
  ListFinancialEventGroupsResponse,
  ListFinancialEvents,
  ListFinancialEventsByNextTokenResponse,
  ListFinancialEventsResponse,
} from './codec'

const FINANCES_API_VERSION = '2015-05-01'

export interface ListFinancialEventGroupsParameters {
  MaxResultsPerPage?: number
  FinancialEventGroupStartedAfter: Date
  FinancialEventGroupStartedBefore?: Date
}

export type ListFinancialEventsParameters = RequireOnlyOne<
  {
    MaxResultsPerPage?: number
    AmazonOrderId?: string
    FinancialEventGroupId?: string
    PostedAfter?: Date
    PostedBefore?: Date
  },
  'PostedAfter' | 'AmazonOrderId' | 'FinancialEventGroupId'
>

export class Finances {
  constructor(private httpClient: HttpClient) {}

  async listFinancialEventsByNextToken(
    nextToken: NextToken<'ListFinancialEvents'>,
  ): Promise<[ListFinancialEvents, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Finances,
      version: FINANCES_API_VERSION,
      action: 'ListFinancialEventsByNextToken',
      parameters: {
        NextToken: nextToken.token,
      },
    })

    return ListFinancialEventsByNextTokenResponse.decode(response).caseOf({
      Right: (x) => [
        x.ListFinancialEventsByNextTokenResponse.ListFinancialEventsByNextTokenResult,
        meta,
      ],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async listFinancialEvents(
    parameters: ListFinancialEventsParameters,
  ): Promise<[ListFinancialEvents, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Finances,
      version: FINANCES_API_VERSION,
      action: 'ListFinancialEvents',
      parameters: {
        MaxResultsPerPage: parameters.MaxResultsPerPage,
        AmazonOrderId: parameters.AmazonOrderId,
        FinancialEventGroupId: parameters.FinancialEventGroupId,
        PostedAfter: parameters.PostedAfter?.toISOString(),
        PostedBefore: parameters.PostedBefore?.toISOString(),
      },
    })

    return ListFinancialEventsResponse.decode(response).caseOf({
      Right: (x) => [x.ListFinancialEventsResponse.ListFinancialEventsResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async listFinancialEventGroupsByNextToken(
    nextToken: NextToken<'ListFinancialEventGroups'>,
  ): Promise<[ListFinancialEventGroups, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Finances,
      version: FINANCES_API_VERSION,
      action: 'ListFinancialEventGroupsByNextToken',
      parameters: {
        NextToken: nextToken.token,
      },
    })

    return ListFinancialEventGroupsByNextTokenResponse.decode(response).caseOf({
      Right: (x) => [
        x.ListFinancialEventGroupsByNextTokenResponse.ListFinancialEventGroupsByNextTokenResult,
        meta,
      ],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async listFinancialEventGroups(
    parameters: ListFinancialEventGroupsParameters,
  ): Promise<[ListFinancialEventGroups, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Finances,
      version: FINANCES_API_VERSION,
      action: 'ListFinancialEventGroups',
      parameters: {
        MaxResultsPerPage: parameters.MaxResultsPerPage,
        FinancialEventGroupStartedAfter: parameters.FinancialEventGroupStartedAfter.toISOString(),
        FinancialEventGroupStartedBefore: parameters.FinancialEventGroupStartedBefore?.toISOString(),
      },
    })

    return ListFinancialEventGroupsResponse.decode(response).caseOf({
      Right: (x) => [x.ListFinancialEventGroupsResponse.ListFinancialEventGroupsResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getServiceStatus() {
    return getServiceStatusByResource(this.httpClient, Resource.Finances, FINANCES_API_VERSION)
  }
}
