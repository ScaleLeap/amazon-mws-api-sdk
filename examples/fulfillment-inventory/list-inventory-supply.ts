/* eslint-disable eslint-comments/disable-enable-pair, import/no-unresolved, no-console */

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
  RequestMeta,
} from '../../src'

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
  const [listInventorySupply, requestMeta]: [
    InventorySupplyList,
    RequestMeta,
  ] = await fulfillmentInventory.listInventorySupply({
    MarketplaceId: amazonMarketplaces.CA.id,
    SellerSkus: ['SKU123', 'SKU456'],
    ResponseGroup: 'Basic',
  })

  console.log(listInventorySupply, requestMeta)

  /**
   * Check out Amazon's official docs for other available endpoints
   * and definitions of possible request and response parameters
   * http://docs.developer.amazonservices.com/en_CA/dev_guide/index.html
   * Under the folder API References
   */
}

main().catch((error) => console.error(error))
