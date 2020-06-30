// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * More usage examples at
 * /test/integration/orders.test.ts
 * /test/unit/orders.test.ts
 */

/**
 * import from '@scaleleap/amazon-mws-api-sdk'
 */
import {
  amazonMarketplaces,
  EasyShipShipmentStatus,
  FulfillmentChannel,
  HttpClient,
  ListOrderParameters,
  ListOrders,
  MWSOptions,
  Orders,
  OrderStatus,
  PaymentMethod,
  RequestMeta,
} from '@scaleleap/amazon-mws-api-sdk'
/**
 * Configure the HttpClient
 */

const mwsOptions: MWSOptions = {
  marketplace: amazonMarketplaces.US,
  awsAccessKeyId: '',
  mwsAuthToken: '',
  sellerId: '',
  secretKey: '',
}

const http = new HttpClient(mwsOptions)
const orders = new Orders(http)

const main = async () => {
  const easyShipmentStatus: EasyShipShipmentStatus = ['PendingPickUp']
  const paymentMethod: PaymentMethod = ['COD']
  const fulfillmentChannel: FulfillmentChannel = ['AFN']
  const orderStatus: OrderStatus = ['PendingAvailability']

  const afterDate = new Date(Date.now() - 150 * 24 * 60 * 60 * 1000) // Date from 150 days ago
  const beforeDate = new Date(Date.now() - 100 * 24 * 60 * 60 * 1000) // Date from 100 days ago

  const parameters: ListOrderParameters = {
    /**
     * REQUIRED
     */
    MarketplaceId: [amazonMarketplaces.US.id],
    /**
     * Either `CreatedAfter` or `LastUpdatedAfter` not both
     */
    CreatedAfter: afterDate,
    // LastUpdatedAfter: afterDate,

    /**
     * OPTIONAL
     */
    // CreatedBefore: beforeDate,
    // LastUpdatedBefore: beforeDate,
    // OrderStatus: orderStatus,
    // FulfillmentChannel: fulfillmentChannel,
    // PaymentMethod: paymentMethod,
    // BuyerEmail: 'email@example.com',
    // SellerOrderId: '123',
    // MaxResultsPerPage: 10,
    // EasyShipShipmentStatus: easyShipmentStatus,
  }

  const [ordersList, requestMeta]: [ListOrders, RequestMeta] = await orders.listOrders(parameters)
  ordersList.Orders.forEach((order) => {
    console.log(`Order ID is ${order.AmazonOrderId}`)
  })

  /**
   * Check out Amazon's official docs for other available endpoints
   * and definitions of possible request and response parameters
   * http://docs.developer.amazonservices.com/en_CA/dev_guide/index.html
   * Under the folder API References
   */
}
