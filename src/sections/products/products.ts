import { ParsingError } from '../../error'
import { HttpClient, RequestMeta, Resource } from '../../http'
import { getServiceStatusByResource } from '../shared'
import {
  GetCompetitivePricingForASINResponse,
  GetCompetitivePricingForASINResult,
  GetCompetitivePricingForSKUResponse,
  GetCompetitivePricingForSKUResult,
  GetLowestOfferListingsForASINResponse,
  GetLowestOfferListingsForASINResult,
  GetLowestOfferListingsForSKUResponse,
  GetLowestOfferListingsForSKUResult,
  GetLowestPricedOffersForASIN,
  GetLowestPricedOffersForASINResponse,
  GetLowestPricedOffersForSKU,
  GetLowestPricedOffersForSKUResponse,
  GetMatchingProductForIdResponse,
  GetMatchingProductForIdResponseCodec,
  GetMatchingProductResponse,
  GetMatchingProductResult,
  GetMyFeesEstimate,
  GetMyFeesEstimateResponse,
  GetMyPriceForASINResponse,
  GetMyPriceForASINResult,
  GetMyPriceForSKUResponse,
  GetMyPriceForSKUResult,
  GetProductCategoriesForASIN,
  GetProductCategoriesForASINResponse,
  GetProductCategoriesForSKU,
  GetProductCategoriesForSKUResponse,
  ListMatchingProducts,
  ListMatchingProductsResponse,
} from './codec'
import {
  GetCompetitivePricingForAsinParameters,
  GetCompetitivePricingForSkuParameters,
  GetLowestOfferListingsForAsinParameters,
  GetLowestOfferListingsForSkuParameters,
  GetLowestPricedOffersForAsinParameters,
  GetLowestPricedOffersForSkuParameters,
  GetMatchingProductForIdParameters,
  GetMatchingProductParameters,
  GetMyFeesEstimateParameters,
  GetMyPriceForAsinParameters,
  GetMyPriceForSkuParameters,
  GetProductCategoriesForAsinParameters,
  GetProductCategoriesForSkuParameters,
  ListMatchingProductsRequestParameters,
} from './type'

const PRODUCTS_API_VERSION = '2011-10-01'

export class Products {
  constructor(private httpClient: HttpClient) {}

  async getServiceStatus() {
    return getServiceStatusByResource(this.httpClient, Resource.Products, PRODUCTS_API_VERSION)
  }

  async listMatchingProducts(
    parameters: ListMatchingProductsRequestParameters,
  ): Promise<[ListMatchingProducts, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Products,
      version: PRODUCTS_API_VERSION,
      action: 'ListMatchingProducts',
      parameters,
    })

    return ListMatchingProductsResponse.decode(response).caseOf({
      Right: (x) => [x.ListMatchingProductsResponse.ListMatchingProductsResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getMyFeesEstimate(
    parameters: GetMyFeesEstimateParameters,
  ): Promise<[GetMyFeesEstimate, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Products,
      version: PRODUCTS_API_VERSION,
      action: 'GetMyFeesEstimate',
      parameters: {
        'FeesEstimateRequestList.FeesEstimateRequest': parameters.FeesEstimateRequestList,
      },
    })

    return GetMyFeesEstimateResponse.decode(response).caseOf({
      Right: (x) => [x.GetMyFeesEstimateResponse.GetMyFeesEstimateResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getMatchingProduct(
    parameters: GetMatchingProductParameters,
  ): Promise<[GetMatchingProductResult, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Products,
      version: PRODUCTS_API_VERSION,
      action: 'GetMatchingProduct',
      parameters: {
        'ASINList.ASIN': parameters.ASINList,
        MarketplaceId: parameters.MarketplaceId,
      },
    })

    return GetMatchingProductResponse.decode(response).caseOf({
      Right: (x) => [x.GetMatchingProductResponse, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getMatchingProductForId(
    parameters: GetMatchingProductForIdParameters,
  ): Promise<[GetMatchingProductForIdResponse, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Products,
      version: PRODUCTS_API_VERSION,
      action: 'GetMatchingProductForId',
      parameters: {
        'IdList.Id': parameters.IdList,
        IdType: parameters.IdType,
        MarketplaceId: parameters.MarketplaceId,
      },
    })

    return GetMatchingProductForIdResponseCodec.decode(response).caseOf({
      Right: (x) => [x.GetMatchingProductForIdResponse, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getCompetitivePricingForSku(
    parameters: GetCompetitivePricingForSkuParameters,
  ): Promise<[GetCompetitivePricingForSKUResult, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Products,
      version: PRODUCTS_API_VERSION,
      action: 'GetCompetitivePricingForSKU',
      parameters: {
        'SellerSKUList.SellerSKU': parameters.SellerSKUList,
        MarketplaceId: parameters.MarketplaceId,
      },
    })

    return GetCompetitivePricingForSKUResponse.decode(response).caseOf({
      Right: (x) => [x.GetCompetitivePricingForSKUResponse, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getCompetitivePricingForAsin(
    parameters: GetCompetitivePricingForAsinParameters,
  ): Promise<[GetCompetitivePricingForASINResult, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Products,
      version: PRODUCTS_API_VERSION,
      action: 'GetCompetitivePricingForASIN',
      parameters: {
        'ASINList.ASIN': parameters.ASINList,
        MarketplaceId: parameters.MarketplaceId,
      },
    })

    return GetCompetitivePricingForASINResponse.decode(response).caseOf({
      Right: (x) => [x.GetCompetitivePricingForASINResponse, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getLowestOfferListingsForSku(
    parameters: GetLowestOfferListingsForSkuParameters,
  ): Promise<[GetLowestOfferListingsForSKUResult, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Products,
      version: PRODUCTS_API_VERSION,
      action: 'GetLowestOfferListingsForSKU',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
        'SellerSKUList.SellerSKU': parameters.SellerSKUList,
        ItemCondition: parameters.ItemCondition,
      },
    })

    return GetLowestOfferListingsForSKUResponse.decode(response).caseOf({
      Right: (x) => [x.GetLowestOfferListingsForSKUResponse, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getLowestOfferListingsForAsin(
    parameters: GetLowestOfferListingsForAsinParameters,
  ): Promise<[GetLowestOfferListingsForASINResult, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Products,
      version: PRODUCTS_API_VERSION,
      action: 'GetLowestOfferListingsForASIN',
      parameters: {
        'ASINList.ASIN': parameters.ASINList,
        MarketplaceId: parameters.MarketplaceId,
        ItemCondition: parameters.ItemCondition,
      },
    })

    return GetLowestOfferListingsForASINResponse.decode(response).caseOf({
      Right: (x) => [x.GetLowestOfferListingsForASINResponse, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getLowestPricedOffersForSku(
    parameters: GetLowestPricedOffersForSkuParameters,
  ): Promise<[GetLowestPricedOffersForSKU, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Products,
      version: PRODUCTS_API_VERSION,
      action: 'GetLowestPricedOffersForSKU',
      parameters,
    })

    return GetLowestPricedOffersForSKUResponse.decode(response).caseOf({
      Right: (x) => [x.GetLowestPricedOffersForSKUResponse.GetLowestPricedOffersForSKUResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getLowestPricedOffersForAsin(
    parameters: GetLowestPricedOffersForAsinParameters,
  ): Promise<[GetLowestPricedOffersForASIN, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Products,
      version: PRODUCTS_API_VERSION,
      action: 'GetLowestPricedOffersForASIN',
      parameters,
    })

    return GetLowestPricedOffersForASINResponse.decode(response).caseOf({
      Right: (x) => [
        x.GetLowestPricedOffersForASINResponse.GetLowestPricedOffersForASINResult,
        meta,
      ],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getMyPriceForSku(
    parameters: GetMyPriceForSkuParameters,
  ): Promise<[GetMyPriceForSKUResult, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Products,
      version: PRODUCTS_API_VERSION,
      action: 'GetMyPriceForSKU',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
        'SellerSKUList.SellerSKU': parameters.SellerSKUList,
        ItemCondition: parameters.ItemCondition,
      },
    })

    return GetMyPriceForSKUResponse.decode(response).caseOf({
      Right: (x) => [x.GetMyPriceForSKUResponse, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getMyPriceForAsin(
    parameters: GetMyPriceForAsinParameters,
  ): Promise<[GetMyPriceForASINResult, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Products,
      version: PRODUCTS_API_VERSION,
      action: 'GetMyPriceForASIN',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
        'ASINList.ASIN': parameters.ASINList,
        ItemCondition: parameters.ItemCondition,
      },
    })

    return GetMyPriceForASINResponse.decode(response).caseOf({
      Right: (x) => [x.GetMyPriceForASINResponse, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getProductCategoriesForSku(
    parameters: GetProductCategoriesForSkuParameters,
  ): Promise<[GetProductCategoriesForSKU, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Products,
      version: PRODUCTS_API_VERSION,
      action: 'GetProductCategoriesForSKU',
      parameters,
    })

    return GetProductCategoriesForSKUResponse.decode(response).caseOf({
      Right: (x) => [x.GetProductCategoriesForSKUResponse.GetProductCategoriesForSKUResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getProductCategoriesForAsin(
    parameters: GetProductCategoriesForAsinParameters,
  ): Promise<[GetProductCategoriesForASIN, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Products,
      version: PRODUCTS_API_VERSION,
      action: 'GetProductCategoriesForASIN',
      parameters,
    })

    return GetProductCategoriesForASINResponse.decode(response).caseOf({
      Right: (x) => [x.GetProductCategoriesForASINResponse.GetProductCategoriesForASINResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }
}
