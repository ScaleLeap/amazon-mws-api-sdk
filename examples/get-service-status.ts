// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * import from '@scaleleap/amazon-mws-api-sdk'
 */
import { amazonMarketplaces, HttpClient, MWS, Sellers } from '@scaleleap/amazon-mws-api-sdk'

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

/**
 * Get service status of the Sellers API using sections directly
 */
const usingSections = async () => {
  const http = new HttpClient(mwsOptions)

  /**
   * Configure which API you need
   *  Sellers, Orders, Fulfillment Inventory, Products, Reports, Subscriptions, Finances, Feeds
   */
  const sellers = new Sellers(http)
  /**
   * Returns a tuple containing
   * [0] Actual response data in JS object format
   * [1] Metadata of the request
   */
  const [serviceStatus, requestMeta] = await sellers.getServiceStatus()

  if (serviceStatus.Status === 'GREEN') {
    console.log(`Sellers API is up on ${serviceStatus.Timestamp}!`)
  }
}

// Using MWS client
const usingMws = async () => {
  const http = new HttpClient(mwsOptions)
  const mws = new MWS(http)

  const [serviceStatus] = await mws.sellers.getServiceStatus()
  if (serviceStatus.Status === 'GREEN') {
    console.log(`Sellers API is up on ${serviceStatus.Timestamp}!`)
  }
}

/**
 * Check out Amazon's official docs for other available endpoints
 * and definitions of possible request and response parameters
 * http://docs.developer.amazonservices.com/en_CA/dev_guide/index.html
 * Under the folder API References
 */
