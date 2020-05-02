import { HttpClient, MWSOptions, Resource } from '../http'

export class Sellers {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(private options: MWSOptions, private httpClient: HttpClient) {}

  // TODO: type and parse response
  listMarketplaceParticipations() {
    return this.httpClient.request('GET', {
      ...this.options,
      resource: Resource.Sellers,
      version: '2011-07-01',
      action: 'ListMarketplaceParticipations',
      parameters: {},
    })
  }
}
