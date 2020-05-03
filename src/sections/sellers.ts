import { HttpClient, Resource } from '../http'

interface MarketplaceParticipations {
  ListMarketplaceParticipationsResponse: {
    ListMarketplaceParticipationsResult: [
      {
        NextToken: [string]
        ListParticipations: Array<{
          Participation: [
            {
              MarketplaceId: [string]
              SellerId: [string]
              HasSellerSuspendedListings: [string]
            },
          ]
        }>
        ListMarketplaces: Array<{
          Marketplace: [
            {
              MarketplaceId: [string]
              Name: [string]
              DefaultCountryCode: [string]
              DefaultCurrencyCode: [string]
              DefaultLanguageCode: [string]
              DomainName: [string]
            },
          ]
        }>
      },
    ]
    ResponseMetadata: [{ RequestId: [string] }]
  }
}

export class Sellers {
  constructor(private httpClient: HttpClient) {}

  // TODO: transform response
  async listMarketplaceParticipations() {
    return this.httpClient.request('POST', {
      resource: Resource.Sellers,
      version: '2011-07-01',
      action: 'ListMarketplaceParticipations',
      parameters: {},
    })
  }
}
