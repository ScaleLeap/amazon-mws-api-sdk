import { HttpClient, Resource } from '../http'
import { getServiceStatusByResource } from './shared'

const SELLERS_API_VERSION = '2018-11-01'

export class ShipmentInvoicing {
  constructor(private httpClient: HttpClient) {}

  async getServiceStatus() {
    return getServiceStatusByResource(
      this.httpClient,
      Resource.ShipmentInvoicing,
      SELLERS_API_VERSION,
    )
  }
}
