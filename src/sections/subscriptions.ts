import { HttpClient, Resource } from '../http'
import { getServiceStatusByResource } from './shared'

const SUBSCRIPTIONS_API_VERSION = '2011-07-01'

export class Subscriptions {
  constructor(private httpClient: HttpClient) {}

  async getServiceStatus() {
    return getServiceStatusByResource(
      this.httpClient,
      Resource.Subscriptions,
      SUBSCRIPTIONS_API_VERSION,
    )
  }
}
