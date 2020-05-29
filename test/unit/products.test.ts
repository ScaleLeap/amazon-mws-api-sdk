import { amazonMarketplaces, HttpClient, ParsingError } from '../../src'
import { MWS } from '../../src/mws'
import { ItemCondition } from '../../src/sections/products/type'
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

const mockGetCompetitivePricingForAsin = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('products_get_competitive_pricing_for_asin'),
      headers,
    }),
  ),
)

const mockGetLowestOfferListingsForSku = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('products_get_lowest_offer_listings_for_sku'),
      headers,
    }),
  ),
)

const mockGetLowestOfferListingsForAsin = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('products_get_lowest_offer_listings_for_asin'),
      headers,
    }),
  ),
)

const mockGetLowestPricedOffersForSku = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('products_get_lowest_priced_offers_for_sku'),
      headers,
    }),
  ),
)

const mockGetLowestPricedOffersForAsin = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('products_get_lowest_priced_offers_for_asin'),
      headers,
    }),
  ),
)

const mockMwsFail = new MWS(
  new HttpClient(httpConfig, () => Promise.resolve({ data: '', headers: {} })),
)

const mockMwsServiceStatus = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('get_service_status'),
      headers,
    }),
  ),
)

const parsingError = 'Expected an object, but received a string with value ""'

describe('products', () => {
  describe('getLowestPricedOffersForAsin', () => {
    const parameters = {
      MarketplaceId: '',
      ASIN: '',
      ItemCondition: 'New' as ItemCondition,
    }

    it('returns lowest priced offer for sku when response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockGetLowestPricedOffersForAsin.products.getLowestPricedOffersForAsin(parameters),
      ).toMatchSnapshot()
    })

    it('throws an error when the response isnt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.products.getLowestPricedOffersForAsin(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getLowestPricedOffersForSku', () => {
    const parameters = {
      MarketplaceId: '',
      SellerSKU: '',
      ItemCondition: 'New' as ItemCondition,
    }

    it('returns lowest priced offer for sku when response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockGetLowestPricedOffersForSku.products.getLowestPricedOffersForSku(parameters),
      ).toMatchSnapshot()
    })

    it('throws an error when the response isnt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.products.getLowestPricedOffersForSku(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getLowestOfferListingsForAsin', () => {
    const parameters = {
      MarketplaceId: '',
      ASINList: [],
    }

    it('returns product and lowest offer listings when response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockGetLowestOfferListingsForAsin.products.getLowestOfferListingsForAsin(parameters),
      ).toMatchSnapshot()
    })

    it("throws an error when the response isn't valid", async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.products.getLowestOfferListingsForAsin(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getLowestOfferListingsForSku', () => {
    const parameters = {
      MarketplaceId: '',
      SellerSKUList: [],
    }

    it('returns product and lowest offer listings when response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockGetLowestOfferListingsForSku.products.getLowestOfferListingsForSku(parameters),
      ).toMatchSnapshot()
    })

    it("throws an error when the response isn't valid", async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.products.getLowestOfferListingsForSku(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getCompetitivePricingForAsin', () => {
    it('returns product and competitive prices when response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockGetCompetitivePricingForAsin.products.getCompetitivePricingForAsin({
          MarketplaceId: '',
          ASINList: [],
        }),
      ).toMatchSnapshot()
    })

    it('throws an error when the response is invalid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.products.getCompetitivePricingForAsin({
          MarketplaceId: '',
          ASINList: [],
        }),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

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

  describe('getServiceStatus', () => {
    it('returns a parsed model when the status response is valid', async () => {
      expect.assertions(1)

      expect(await mockMwsServiceStatus.products.getServiceStatus()).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.products.getServiceStatus()).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })
})
