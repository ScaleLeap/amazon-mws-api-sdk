import { Codec, enumeration, GetInterface, number, optional, string } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import {
  ensureArray,
  ensureString,
  mwsDate,
  NextToken,
  nextToken as nextTokenCodec,
} from '../parsing'
import { getServiceStatusByResource } from './shared'

const FINANCES_API_VERSION = '2015-05-01'

interface ListFinancialEventGroupsParameters {
  MaxResultsPerPage?: number
  FinancialEventGroupStartedAfter: Date
  FinancialEventGroupStartedBefore?: Date
}

enum ProcessingStatusEnum {
  Open = 'Open',
  Closed = 'Closed',
}

const ProcessingStatus = enumeration(ProcessingStatusEnum)

const CurrencyAmount = Codec.interface({
  CurrencyCode: optional(string),
  CurrencyAmount: optional(number),
})

const FinancialEventGroup = Codec.interface({
  FinancialEventGroupId: optional(string),
  ProcessingStatus: optional(ProcessingStatus),
  FundTransferStatus: optional(string),
  OriginalTotal: optional(CurrencyAmount),
  ConvertedTotal: optional(CurrencyAmount),
  FundTransferDate: optional(mwsDate),
  TraceId: optional(ensureString),
  AccountTail: optional(ensureString),
  BeginningBalance: optional(CurrencyAmount),
  FinancialEventGroupStart: optional(mwsDate),
  FinancialEventGroupEnd: optional(mwsDate),
})

const ListFinancialEventGroups = Codec.interface({
  NextToken: optional(nextTokenCodec('ListFinancialEventGroups')),
  FinancialEventGroupList: ensureArray('FinancialEventGroup', FinancialEventGroup),
})

type ListFinancialEventGroups = GetInterface<typeof ListFinancialEventGroups>

const ListFinancialEventGroupsResponse = Codec.interface({
  ListFinancialEventGroupsResponse: Codec.interface({
    ListFinancialEventGroupsResult: ListFinancialEventGroups,
  }),
})

const ListFinancialEventGroupsByNextTokenResponse = Codec.interface({
  ListFinancialEventGroupsByNextTokenResponse: Codec.interface({
    ListFinancialEventGroupsByNextTokenResult: ListFinancialEventGroups,
  }),
})

export class Finances {
  constructor(private httpClient: HttpClient) {}

  async listFinancialEventGroupsByNextToken(
    nextToken: NextToken<'ListFinancialEventGroups'>,
  ): Promise<[ListFinancialEventGroups, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Finances,
      version: FINANCES_API_VERSION,
      action: 'ListFinancialEventGroups',
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
