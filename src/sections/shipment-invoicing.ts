import { HttpClient, Resource } from '../http'
import { getServiceStatusByResource } from './shared'

/**
 * The first API version is what's written in the docs directory name
 * but the second one is what's used in the request examples
 * Keeping both for now as reference, and encountered an issue in integrations
 * early on (something about incorrect address) that resolved itself for some reason
 */
const SHIPMENT_INVOICING_API_VERSION = '2018-11-01'
// const SHIPMENT_INVOICING_API_VERSION = '2018-09-01'
export class ShipmentInvoicing {
  constructor(private httpClient: HttpClient) {}

  async getServiceStatus() {
    return getServiceStatusByResource(
      this.httpClient,
      Resource.ShipmentInvoicing,
      SHIPMENT_INVOICING_API_VERSION,
    )
  }
}
