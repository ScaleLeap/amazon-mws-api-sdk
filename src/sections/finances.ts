import { HttpClient, Resource } from '../http'
import { getServiceStatusByResource } from './shared'

const FINANCES_API_VERSION = '2015-05-01'

export class Finances {
  constructor(private httpClient: HttpClient) {}

  async getServiceStatus() {
    return getServiceStatusByResource(this.httpClient, Resource.Finances, FINANCES_API_VERSION)
  }
}
