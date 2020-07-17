import { HttpClient, Resource } from '../../http'
import { getServiceStatusByResource } from '../shared'

const FOS_API_VERSION = '2010-10-01'

export class FulfillmentOutboundShipment {
  constructor(private httpClient: HttpClient) {}

  async getServiceStatus() {
    return getServiceStatusByResource(this.httpClient, Resource.Sellers, FOS_API_VERSION)
  }
}
