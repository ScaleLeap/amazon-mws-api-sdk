import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'

import { HttpClient, Resource } from '../http'
import { ensureArray, parseBoolean } from '../parsing'

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

const MarketplaceParticipations = Type.Object({
  participations: Type.Array(
    Type.Object({
      marketplaceId: Type.String(),
      sellerId: Type.String(),
      hasSellerSuspendedListings: Type.Boolean(),
    }),
  ),
  marketplaces: Type.Array(
    Type.Object({
      marketplaceId: Type.String(),
      name: Type.String(),
      defaultCountryCode: Type.String(),
      defaultCurrencyCode: Type.String(),
      defaultLanguageCode: Type.String(),
      domainName: Type.String(),
    }),
  ),
})

// Unfortunately typebox creates an ugly type from Static<typeof X> (not a regular object with keys),
// it's not something that we can expose from this library, so I've added a manually created interface
interface MarketplaceParticipations {
  participations: Array<{
    marketplaceId: string
    sellerId: string
    hasSellerSuspendedListings: boolean
  }>
  marketplaces: Array<{
    marketplaceId: string
    name: string
    defaultCountryCode: string
    defaultCurrencyCode: string
    defaultLanguageCode: string
    domainName: string
  }>
}

export class Sellers {
  constructor(private httpClient: HttpClient) {}

  async listMarketplaceParticipations(): Promise<MarketplaceParticipations> {
    const response: MarketplaceParticipationsResponse = await this.httpClient.request('POST', {
      resource: Resource.Sellers,
      version: '2011-07-01',
      action: 'ListMarketplaceParticipations',
      parameters: {},
    })

    const data = response.ListMarketplaceParticipationsResponse.ListMarketplaceParticipationsResult

    const result: MarketplaceParticipations = {
      participations: ensureArray(data.ListParticipations.Participation).map((x) => ({
        marketplaceId: x.MarketplaceId,
        sellerId: x.SellerId,
        hasSellerSuspendedListings: parseBoolean(x.HasSellerSuspendedListings),
      })),
      marketplaces: ensureArray(data.ListMarketplaces.Marketplace).map((x) => ({
        marketplaceId: x.MarketplaceId,
        name: x.Name,
        defaultCountryCode: x.DefaultCountryCode,
        defaultCurrencyCode: x.DefaultCurrencyCode,
        defaultLanguageCode: x.DefaultLanguageCode,
        domainName: x.DomainName,
      })),
    }

    if (new Ajv().validate(MarketplaceParticipations, result)) {
      return result
    }

    throw new Error('TODO for now')
  }
}
