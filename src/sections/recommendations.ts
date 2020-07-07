import { HttpClient, Resource } from '../http'
import { getServiceStatusByResource } from './shared'

const RECOMMENDATIONS_API_VERSION = '2013-04-01'

export class Recommendations {
  constructor(private httpClient: HttpClient) {}

  async getServiceStatus() {
    return getServiceStatusByResource(
      this.httpClient,
      Resource.Recommendations,
      RECOMMENDATIONS_API_VERSION,
    )
  }
}
