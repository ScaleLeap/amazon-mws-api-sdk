// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * import from 'amazon-mws-api-sdk'
 */
import { amazonMarketplaces, HttpClient, MWSOptions, NextToken, Sellers } from '../src'

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

/**
 * Configure which API you need
 *  Sellers, Orders, Fulfillment Inventory, Products, Reports, Subscriptions, Finances, Feeds
 */
const sellers = new Sellers(http)

/**
 * Get service status of the Sellers API
 */
const main = async () => {
  /**
   * Construct your next token with the following arguments
   * 1. Valid Amazon MWS action.
   * 2. Actual NextToken
   */
  const nextToken = new NextToken('ListMarketplaceParticipations', 'NEXTTOKEN123')

  /**
   * Returns a tuple containing
   * [0] Actual response data in JS object format
   * [1] Metadata of the request
   */
  const [
    marketplaceParticipationsList,
    requestMeta,
  ] = await sellers.listMarketplaceParticipationsByNextToken(nextToken)

  /**
   * Using received NextTokens
   */

  const newNextToken = marketplaceParticipationsList.NextToken?.token

  /**
   * Check out Amazon's official docs for other available endpoints
   * and definitions of possible request and response parameters
   * http://docs.developer.amazonservices.com/en_CA/dev_guide/index.html
   * Under the folder API References
   */
}
