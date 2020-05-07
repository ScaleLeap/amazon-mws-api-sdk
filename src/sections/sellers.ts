import { Codec, GetInterface, optional, string } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { ensureArray, mwsBoolean, serviceStatus } from '../parsing'

const SELLERS_API_VERSION = '2011-07-01'

const MarketplaceParticipations = Codec.interface({
  NextToken: optional(string),
  ListParticipations: Codec.interface({
    Participation: ensureArray(
      Codec.interface({
        MarketplaceId: string,
        SellerId: string,
        HasSellerSuspendedListings: mwsBoolean,
      }),
    ),
  }),
  ListMarketplaces: Codec.interface({
    Marketplace: ensureArray(
      Codec.interface({
        MarketplaceId: string,
        Name: string,
        DefaultCountryCode: string,
        DefaultCurrencyCode: string,
        DefaultLanguageCode: string,
        DomainName: string,
      }),
    ),
  }),
})

const MarketplaceParticipationsResponse = Codec.interface({
  ListMarketplaceParticipationsResponse: Codec.interface({
    ListMarketplaceParticipationsResult: MarketplaceParticipations,
  }),
})

const MarketplaceParticipationsByNextTokenResponse = Codec.interface({
  ListMarketplaceParticipationsByNextTokenResponse: Codec.interface({
    ListMarketplaceParticipationsByNextTokenResult: MarketplaceParticipations,
  }),
})

const ServiceStatusResponse = Codec.interface({
  GetServiceStatusResponse: Codec.interface({
    GetServiceStatusResult: Codec.interface({
      Status: serviceStatus,
      Timestamp: string,
    }),
  }),
})

type MarketplaceParticipations = GetInterface<typeof MarketplaceParticipations>
type ServiceStatusResponse = GetInterface<
  typeof ServiceStatusResponse
>['GetServiceStatusResponse']['GetServiceStatusResult']

export class Sellers {
  constructor(private httpClient: HttpClient) {}

  async listMarketplaceParticipations(): Promise<[MarketplaceParticipations, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Sellers,
      version: SELLERS_API_VERSION,
      action: 'ListMarketplaceParticipations',
      parameters: {},
    })

    return MarketplaceParticipationsResponse.decode(response).caseOf({
      Right: (x) => [
        x.ListMarketplaceParticipationsResponse.ListMarketplaceParticipationsResult,
        meta,
      ],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async listMarketplaceParticipationsByNextToken(
    nextToken: string,
  ): Promise<[MarketplaceParticipations, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Sellers,
      version: SELLERS_API_VERSION,
      action: 'ListMarketplaceParticipationsByNextToken',
      parameters: { NextToken: nextToken },
    })

    return MarketplaceParticipationsByNextTokenResponse.decode(response).caseOf({
      Right: (x) => [
        x.ListMarketplaceParticipationsByNextTokenResponse
          .ListMarketplaceParticipationsByNextTokenResult,
        meta,
      ],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getServiceStatus(): Promise<[ServiceStatusResponse, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Sellers,
      version: SELLERS_API_VERSION,
      action: 'GetServiceStatus',
      parameters: {},
    })

    return ServiceStatusResponse.decode(response).caseOf({
      Right: (x) => [x.GetServiceStatusResponse.GetServiceStatusResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }
}
