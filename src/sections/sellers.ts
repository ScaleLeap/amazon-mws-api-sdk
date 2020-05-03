import { HttpClient, Resource } from '../http'

export class Sellers {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(private httpClient: HttpClient) {}

  // TODO: type and parse response
  listMarketplaceParticipations() {
    return this.httpClient.request('POST', {
      resource: Resource.Sellers,
      version: '2011-07-01',
      action: 'ListMarketplaceParticipations',
      parameters: {},
    })
  }
}
