import { Codec, GetType, optional, string } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { ensureArray, mwsBoolean, NextToken, nextToken as nextTokenCodec } from '../parsing'
import { getServiceStatusByResource } from './shared'

const SELLERS_API_VERSION = '2011-07-01'

export const MarketplaceParticipations = Codec.interface({
  NextToken: optional(nextTokenCodec('ListMarketplaceParticipations')),
  ListParticipations: ensureArray(
    'Participation',
    Codec.interface({
      MarketplaceId: string,
      SellerId: string,
      HasSellerSuspendedListings: mwsBoolean,
    }),
  ),
  ListMarketplaces: ensureArray(
    'Marketplace',
    Codec.interface({
      MarketplaceId: string,
      Name: string,
      DefaultCountryCode: string,
      DefaultCurrencyCode: string,
      DefaultLanguageCode: string,
      DomainName: string,
    }),
  ),
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

export type MarketplaceParticipations = GetType<typeof MarketplaceParticipations>

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
    nextToken: NextToken<'ListMarketplaceParticipations'>,
  ): Promise<[MarketplaceParticipations, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Sellers,
      version: SELLERS_API_VERSION,
      action: 'ListMarketplaceParticipationsByNextToken',
      parameters: { NextToken: nextToken.token },
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

  async getServiceStatus() {
    return getServiceStatusByResource(this.httpClient, Resource.Sellers, SELLERS_API_VERSION)
  }
}
