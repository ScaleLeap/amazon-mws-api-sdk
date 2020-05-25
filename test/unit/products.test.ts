import { amazonMarketplaces, HttpClient, ParsingError } from '../../src'
import { MWS } from '../../src/mws'
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

const mockGetMatchingProduct = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('products_get_matching_product'),
      headers,
    }),
  ),
)

const mockGetMatchingProductForId = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('products_get_matching_product_for_id'),
      headers,
    }),
  ),
)

const mockGetCompetitivePricingForSku = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('products_get_competitive_pricing_for_sku'),
      headers,
    }),
  ),
)

const mockMwsFail = new MWS(
  new HttpClient(httpConfig, () => Promise.resolve({ data: '', headers: {} })),
)

const parsingError = 'Expected an object, but received a string with value ""'

describe('products', () => {
  describe('getCompetitivePricingForSku', () => {
    it('returns product and competitive prices when response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockGetCompetitivePricingForSku.products.getCompetitivePricingForSku({
          MarketplaceId: '',
          SellerSKUList: [],
        }),
      ).toMatchSnapshot()
    })

    it('throws an error when the response is invalid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.products.getCompetitivePricingForSku({
          MarketplaceId: '',
          SellerSKUList: [],
        }),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getMatchingProductForId', () => {
    it('returns a matching product when the response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockGetMatchingProductForId.products.getMatchingProductForId({
          MarketplaceId: '',
          IdType: '',
          IdList: [],
        }),
      ).toMatchSnapshot()
    })

    it('throws an error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.products.getMatchingProductForId({ MarketplaceId: '', IdType: '', IdList: [] }),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getMatchingProduct', () => {
    it('returns a matching product when the response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockGetMatchingProduct.products.getMatchingProduct({
          MarketplaceId: '',
          ASINList: [],
        }),
      ).toMatchSnapshot()
    })

    it('throws an error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.products.getMatchingProduct({ MarketplaceId: '', ASINList: [] }),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

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
