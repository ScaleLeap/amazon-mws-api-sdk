import { HttpClient, Resource } from '../http'
import { getServiceStatusByResource } from './shared'

const MERCHANT_FULFILLMENT_API_VERSION = '2015-06-01'

export class MerchantFulfillment {
  constructor(private httpClient: HttpClient) {}

  async getServiceStatus() {
    return getServiceStatusByResource(
      this.httpClient,
      Resource.MerchantFulfillment,
      MERCHANT_FULFILLMENT_API_VERSION,
    )
  }
}
