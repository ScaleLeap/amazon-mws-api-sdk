import { GetType } from 'purify-ts'

import { ParsingError } from '../../src'
import { parseResponse, RequestMeta } from '../../src/http'
import { Product } from '../../src/sections/products/codec'
import {
  FeesEstimateRequest,
  GetMatchingProductIdType,
  ItemCondition,
  MoneyType,
} from '../../src/sections/products/type'
import {
  createMockHttpClient,
  getFixture,
  headers,
  mockMwsServiceStatus,
  mockParsingError,
  parsingErrorRegex,
} from '../utils'

function mockEnum() {
  /**
   * Mock everything in purify-ts, restore it back to normal,
   *  except for `enumeration` which will be stubbed to accept
   * https://github.com/facebook/jest/issues/936#issuecomment-265074320
   */
  const original = jest.requireActual('purify-ts')

  return {
    ...original, // Pass down all the exported objects
    enumeration: <T extends Record<string, string | number>>(enumeration: T) => {
      const enumValues = Object.values(enumeration)

      return original.Codec.custom({
        decode: (input: string | number) => {
          if (typeof input !== 'string' && typeof input !== 'number') {
            return original.Left(`Expected enum, received ${input}`)
          }

          const enumIndex = enumValues.indexOf(input)

          return enumIndex !== -1 || input === 'String'
            ? original.Right((enumValues[enumIndex] as T[keyof T]) || 'String')
            : original.Left(`Expected enum, received ${input}`)
        },
        encode: original.identity,
        schema: () => ({ enum: enumValues }),
      })
    },
  }
}
jest.mock('purify-ts', () => mockEnum())

describe('products', () => {
  describe('product', () => {
    it('should properly decode complete product structure', async () => {
      expect.assertions(1)

      const fixture = getFixture('products_product')
      const [response] = parseResponse({
        data: fixture,
        headers,
      }) as [{ Product: GetType<typeof Product> }, RequestMeta]

      expect(
        Product.decode(response.Product).caseOf({
          Right: (x) => x,
          Left: (error) => {
            throw new ParsingError(error)
          },
        }),
      ).toMatchSnapshot()
    })
  })

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
        mockParsingError.products.getProductCategoriesForAsin(parameters),
      ).rejects.toThrow(parsingErrorRegex)
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
        mockParsingError.products.getProductCategoriesForSku(parameters),
      ).rejects.toThrow(parsingErrorRegex)
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

      await expect(() => mockParsingError.products.getMyPriceForAsin(parameters)).rejects.toThrow(
        parsingErrorRegex,
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

      await expect(() => mockParsingError.products.getMyPriceForSku(parameters)).rejects.toThrow(
        parsingErrorRegex,
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
        mockParsingError.products.getLowestPricedOffersForAsin(parameters),
      ).rejects.toThrow(parsingErrorRegex)
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
        mockParsingError.products.getLowestPricedOffersForSku(parameters),
      ).rejects.toThrow(parsingErrorRegex)
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
        mockParsingError.products.getLowestOfferListingsForAsin(parameters),
      ).rejects.toThrow(parsingErrorRegex)
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
        mockParsingError.products.getLowestOfferListingsForSku(parameters),
      ).rejects.toThrow(parsingErrorRegex)
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
        mockParsingError.products.getCompetitivePricingForAsin({
          MarketplaceId: '',
          ASINList: [],
        }),
      ).rejects.toThrow(parsingErrorRegex)
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
        mockParsingError.products.getCompetitivePricingForSku({
          MarketplaceId: '',
          SellerSKUList: [],
        }),
      ).rejects.toThrow(parsingErrorRegex)
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
        mockParsingError.products.getMatchingProductForId(parameters),
      ).rejects.toThrow(parsingErrorRegex)
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
        mockParsingError.products.getMatchingProduct({ MarketplaceId: '', ASINList: [] }),
      ).rejects.toThrow(parsingErrorRegex)
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
        mockParsingError.products.listMatchingProducts({ MarketplaceId: '', Query: '' }),
      ).rejects.toThrow(parsingErrorRegex)
    })
  })

  describe('getMyFeesEstimate', () => {
    const moneyType: MoneyType = {
      CurrencyCode: 'USD',
      Amount: 1000,
    }

    const sampleFee: FeesEstimateRequest = {
      MarketplaceId: '',
      IdType: 'ASIN',
      IdValue: 'ASD',
      PriceToEstimateFees: {
        ListingPrice: moneyType,
      },
      Identifier: 'request1',
      IsAmazonFulfilled: false,
    }

    it('returns a list fee estimates when the response is valid', async () => {
      expect.assertions(1)

      const mockGetMyFeesEstimate = createMockHttpClient('products_get_my_fees_estimate')

      expect(
        await mockGetMyFeesEstimate.products.getMyFeesEstimate({
          FeesEstimateRequestList: [sampleFee],
        }),
      ).toMatchSnapshot()
    })

    it('returns a list fee estimates when the structure is valid', async () => {
      expect.assertions(1)

      const mockGetMyFeesEstimate = createMockHttpClient(
        'products_get_my_fees_estimate_from_c_sharp',
      )

      expect(
        await mockGetMyFeesEstimate.products.getMyFeesEstimate({
          FeesEstimateRequestList: [sampleFee],
        }),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockParsingError.products.getMyFeesEstimate({ FeesEstimateRequestList: [] }),
      ).rejects.toThrow(parsingErrorRegex)
    })
  })

  describe('getServiceStatus', () => {
    it('returns a parsed model when the status response is valid', async () => {
      expect.assertions(1)

      expect(await mockMwsServiceStatus.products.getServiceStatus()).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockParsingError.products.getServiceStatus()).rejects.toThrow(
        parsingErrorRegex,
      )
    })
  })
})
