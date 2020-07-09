import { HttpClient, Resource } from '../http'
import { getServiceStatusByResource } from './shared'

const FULFILLMENT_INBOUND_SHIPMENT_API_VERSION = '2010-10-01'

export class FulfillmentInboundShipment {
  constructor(private httpClient: HttpClient) {}

  async getServiceStatus() {
    return getServiceStatusByResource(
      this.httpClient,
      Resource.FulfillmentInboundShipment,
      FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
    )
  }
}
