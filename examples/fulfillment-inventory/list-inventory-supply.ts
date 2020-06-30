// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * More usage examples at
 * /test/integration/fulfillment-inventory.test.ts
 * /test/unit/fulfillment-inventory.test.ts
 */

/**
 * import from '@scaleleap/amazon-mws-api-sdk'
 */
import {
  amazonMarketplaces,
  FulfillmentInventory,
  HttpClient,
  InventorySupplyList,
  ListInventorySupplyRequestParameters,
  RequestMeta,
  ResponseGroup,
} from '@scaleleap/amazon-mws-api-sdk'

/**
 * Configure the HttpClient
 */

const mwsOptions = {
  marketplace: amazonMarketplaces.US,
  awsAccessKeyId: '',
  mwsAuthToken: '',
  sellerId: '',
  secretKey: '',
}

const http = new HttpClient(mwsOptions)
const fulfillmentInventory = new FulfillmentInventory(http)

const main = async () => {
  const responseGroup: ResponseGroup = 'Basic'
  const date = new Date(Date.now() - 150 * 24 * 60 * 60 * 1000) // Date from 150 days ago

  const parameters: ListInventorySupplyRequestParameters = {
    /**
     * REQUIRED
     */

    /**
     * Either `MarketplaceId` or `QueryStartDateTime` not both
     */
    MarketplaceId: amazonMarketplaces.US.id,
    // QueryStartDateTime: date,

    /**
     * OPTIONAL
     */

    // SellerSku: ['SKU123']
    // ResponseGroup: responseGroup
  }

  const [listInventorySupply, requestMeta]: [
    InventorySupplyList,
    RequestMeta,
  ] = await fulfillmentInventory.listInventorySupply(parameters)

  /**
   * Check out Amazon's official docs for other available endpoints
   * and definitions of possible request and response parameters
   * http://docs.developer.amazonservices.com/en_CA/dev_guide/index.html
   * Under the folder API References
   */
}
