import { ParsingError } from '../../src'
import { GetMatchingProductIdType, ItemCondition } from '../../src/sections/products/type'
import { createMockHttpClient, mockMwsFail, mockMwsServiceStatus, parsingError } from '../utils'

describe('products', () => {
  describe('getProductCategoriesForAsin', () => {
    const parameters = {
      MarketplaceId: '',
      ASIN: '',
    }

    it('returns product categories for product for asin when response is valid', async () => {
      expect.assertions(1)

      const mockGetProductCategoriesForAsin = createMockHttpClient(
        'products_get_product_categories_for_asin',
      )

      expect(
        await mockGetProductCategoriesForAsin.products.getProductCategoriesForAsin(parameters),
      ).toMatchSnapshot()
    })

    it('throws an error when the response isn t valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.products.getProductCategoriesForAsin(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getProductCategoriesForSku', () => {
    const parameters = {
      MarketplaceId: '',
      SellerSKU: '',
    }

    it('returns product categories for product for sku when response is valid', async () => {
      expect.assertions(1)

      const mockGetProductCategoriesForSku = createMockHttpClient(
        'products_get_product_categories_for_sku',
      )

      expect(
        await mockGetProductCategoriesForSku.products.getProductCategoriesForSku(parameters),
      ).toMatchSnapshot()
    })

    it('throws an error when the response isn t valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.products.getProductCategoriesForSku(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getMyPriceForAsin', () => {
    const parameters = {
      MarketplaceId: '',
      ASINList: [],
    }

    it('returns price for product for asin when response is valid', async () => {
      expect.assertions(1)

      const mockGetMyPriceForAsin = createMockHttpClient('products_get_my_price_for_asin')

      expect(await mockGetMyPriceForAsin.products.getMyPriceForAsin(parameters)).toMatchSnapshot()
    })

    it('throws an error when the response is nt valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.products.getMyPriceForAsin(parameters)).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })

  describe('getMyPriceForSku', () => {
    const parameters = {
      MarketplaceId: '',
      SellerSKUList: [],
    }

    it('returns price for product for sku when response is valid', async () => {
      expect.assertions(1)

      const mockGetMyPriceForSku = createMockHttpClient('products_get_my_price_for_sku')

      expect(await mockGetMyPriceForSku.products.getMyPriceForSku(parameters)).toMatchSnapshot()
    })

    it('throws an error when the response is nt valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.products.getMyPriceForSku(parameters)).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })

  describe('getLowestPricedOffersForAsin', () => {
    const parameters = {
      MarketplaceId: '',
      ASIN: '',
      ItemCondition: 'New' as ItemCondition,
    }

    it('returns lowest priced offer for asin when response is valid', async () => {
      expect.assertions(1)

      const mockGetLowestPricedOffersForAsin = createMockHttpClient(
        'products_get_lowest_priced_offers_for_asin',
      )

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
      expect.assertions(3)

      const mockGetLowestPricedOffersForSku = createMockHttpClient(
        'products_get_lowest_priced_offers_for_sku',
      )

      expect(
        await mockGetLowestPricedOffersForSku.products.getLowestPricedOffersForSku(parameters),
      ).toMatchSnapshot()

      const mockGetLowestPricedOffersForSkuTooSoonForProcessing = createMockHttpClient(
        'products_get_lowest_priced_offers_for_sku_too_soon_for_processing',
      )

      expect(
        await mockGetLowestPricedOffersForSkuTooSoonForProcessing.products.getLowestPricedOffersForSku(
          parameters,
        ),
      ).toMatchSnapshot()

      const mockGetLowestPricedOffersForSkuMissingShipping = createMockHttpClient(
        'products_get_lowest_priced_offers_for_sku_missing_shipping_charge',
      )

      expect(
        await mockGetLowestPricedOffersForSkuMissingShipping.products.getLowestPricedOffersForSku(
          parameters,
        ),
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

      const mockGetLowestOfferListingsForAsin = createMockHttpClient(
        'products_get_lowest_offer_listings_for_asin',
      )

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

      const mockGetLowestOfferListingsForSku = createMockHttpClient(
        'products_get_lowest_offer_listings_for_sku',
      )

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

      const mockGetCompetitivePricingForAsin = createMockHttpClient(
        'products_get_competitive_pricing_for_asin',
      )

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

      const mockGetCompetitivePricingForSku = createMockHttpClient(
        'products_get_competitive_pricing_for_sku',
      )

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
    const parameters = {
      MarketplaceId: '',
      IdType: 'ASIN' as GetMatchingProductIdType,
      IdList: [],
    }

    it('returns a matching product when the response is valid', async () => {
      expect.assertions(1)

      const mockGetMatchingProductForId = createMockHttpClient(
        'products_get_matching_product_for_id',
      )

      expect(
        await mockGetMatchingProductForId.products.getMatchingProductForId(parameters),
      ).toMatchSnapshot()
    })

    it('throws an error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.products.getMatchingProductForId(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getMatchingProduct', () => {
    it('returns a matching product when the response is valid', async () => {
      expect.assertions(1)

      const mockGetMatchingProduct = createMockHttpClient('products_get_matching_product')

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

      const mockListMatchingProducts = createMockHttpClient('products_list_matching_products')

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

      const mockGetMyFeesEstimate = createMockHttpClient('products_get_my_fees_estimate')

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
