import { Codec, GetInterface, string } from 'purify-ts'

import { HttpClient, RequestMeta, Resource } from '../http'
import { ensureArray, mwsBoolean } from '../parsing'

interface MarketplaceParticipationsResponse {
  ListMarketplaceParticipationsResponse: {
    ListMarketplaceParticipationsResult: {
      NextToken: string
      ListParticipations: {
        Participation: Array<{
          MarketplaceId: string
          SellerId: string
          HasSellerSuspendedListings: 'Yes' | 'No'
        }>
      }
      ListMarketplaces: {
        Marketplace: Array<{
          MarketplaceId: string
          Name: string
          DefaultCountryCode: string
          DefaultCurrencyCode: string
          DefaultLanguageCode: string
          DomainName: string
        }>
      }
    }
    ResponseMetadata: { RequestId: string }
  }
}

const MarketplaceParticipations = Codec.interface({
  Participations: ensureArray(
    Codec.interface({
      MarketplaceId: string,
      SellerId: string,
      HasSellerSuspendedListings: mwsBoolean,
    }),
  ),
  Marketplaces: ensureArray(
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

type MarketplaceParticipations = GetInterface<typeof MarketplaceParticipations>

export class Sellers {
  constructor(private httpClient: HttpClient) {}

  async listMarketplaceParticipations(): Promise<[MarketplaceParticipations, RequestMeta]> {
    const [response, meta]: [
      MarketplaceParticipationsResponse,
      RequestMeta,
    ] = await this.httpClient.request('POST', {
      resource: Resource.Sellers,
      version: '2011-07-01',
      action: 'ListMarketplaceParticipations',
      parameters: {},
    })

    const data = response.ListMarketplaceParticipationsResponse.ListMarketplaceParticipationsResult

    return MarketplaceParticipations.decode(data).caseOf({
      Right: (x) => [x, meta],
      Left: (error) => {
        throw new Error(error)
      },
    })
  }
}
