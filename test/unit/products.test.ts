import { amazonMarketplaces, HttpClient, ParsingError } from '../../src'
import { MWS } from '../../src/mws'
// import { NextToken } from '../../src/parsing'
import { getFixture } from '../utils'

const httpConfig = {
  awsAccessKeyId: '',
  marketplace: amazonMarketplaces.CA,
  mwsAuthToken: '',
  secretKey: '',
  sellerId: '',
}

const headers = {
  'x-mws-request-id': '0',
  'x-mws-timestamp': '2020-05-06T09:22:23.582Z',
  'x-mws-quota-max': '1000',
  'x-mws-quota-remaining': '999',
  'x-mws-quota-resetson': '2020-04-06T10:22:23.582Z',
}

const mockListMatchingProducts = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('products_list_matching_products'),
      headers,
    }),
  ),
)

const mockGetMyFeesEstimate = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('products_get_my_fees_estimate'),
      headers,
    }),
  ),
)

const mockMwsFail = new MWS(
  new HttpClient(httpConfig, () => Promise.resolve({ data: '', headers: {} })),
)

// const mockNextTokenInventorySupply = new NextToken('ListInventorySupply', '123')

const parsingError = 'Expected an object, but received a string with value ""'

describe('products', () => {
  describe('listMatchingProducts', () => {
    it('returns an array of products when the response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockListMatchingProducts.products.listMatchingProducts({
          MarketplaceId: '',
          Query: '',
        }),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.products.listMatchingProducts({ MarketplaceId: '', Query: '' }),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getMyFeesEstimate', () => {
    it('returns a list fee estimates when the response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockGetMyFeesEstimate.products.getMyFeesEstimate({ FeesEstimateRequestList: [] }),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.products.getMyFeesEstimate({ FeesEstimateRequestList: [] }),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })
})
