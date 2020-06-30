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

  const newNextToken = marketplaceParticipationsList.NextToken
  if (newNextToken) {
    const [
      newMarketplaceParticipationsList,
      newRequestMeta,
    ] = await sellers.listMarketplaceParticipationsByNextToken(newNextToken)
  }

  /**
   * If you have next tokens from outside the SDK you can instantiate your own
   */

  const myNextTokenFromOutsideTheApplication = new NextToken(
    /**
     * Action needs to match the original action instead of the "...ByNextToken" action
     * i.e. use `ListMarketplaceParticipations` as your action instead of `ListMarketplaceParticipationsByNextToken`
     */
    'ListMarketplaceParticipations', // Action
    'MYNEXTTOKEN123', // Next token value
  )

  const [
    myMarketPlaceParticipationsList,
    myRequestMeta,
  ] = await sellers.listMarketplaceParticipationsByNextToken(myNextTokenFromOutsideTheApplication)

  /**
   * "Using NextToken to request additional pages" from the Amazon documentation
   * http://docs.developer.amazonservices.com/en_CA/dev_guide/DG_NextToken.html
   */

  /**
   * Check out Amazon's official docs for other available endpoints
   * and definitions of possible request and response parameters
   * http://docs.developer.amazonservices.com/en_CA/dev_guide/index.html
   * Under the folder API References
   */
}
