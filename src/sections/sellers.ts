import { Codec, GetInterface, optional, string } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { ensureArray, mwsBoolean } from '../parsing'

const MarketplaceParticipations = Codec.interface({
  ListMarketplaceParticipationsResponse: Codec.interface({
    ListMarketplaceParticipationsResult: Codec.interface({
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
    }),
  }),
})

type MarketplaceParticipationsResponse = GetInterface<typeof MarketplaceParticipations>
type MarketplaceParticipations = MarketplaceParticipationsResponse['ListMarketplaceParticipationsResponse']['ListMarketplaceParticipationsResult']

export class Sellers {
  constructor(private httpClient: HttpClient) {}

  async listMarketplaceParticipations(): Promise<[MarketplaceParticipations, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Sellers,
      version: '2011-07-01',
      action: 'ListMarketplaceParticipations',
      parameters: {},
    })

    return MarketplaceParticipations.decode(response).caseOf({
      Right: (x) => [
        x.ListMarketplaceParticipationsResponse.ListMarketplaceParticipationsResult,
        meta,
      ],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }
}
