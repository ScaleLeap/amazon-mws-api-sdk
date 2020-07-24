import { HttpClient, Resource } from '../http'
import { getServiceStatusByResource } from './shared'

const EASY_SHIP_API_VERSION = '2018-09-01'

export class EasyShip {
  constructor(private httpClient: HttpClient) {}

  async getServiceStatus() {
    return getServiceStatusByResource(this.httpClient, Resource.EasyShip, EASY_SHIP_API_VERSION)
  }
}
