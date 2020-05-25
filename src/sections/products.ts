import {
  boolean,
  Codec,
  exactly,
  GetInterface,
  lazy,
  number,
  oneOf,
  optional,
  record,
  string,
  unknown,
} from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { ensureArray, mwsDate } from '../parsing'

const PRODUCTS_API_VERSION = '2011-10-01'

type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'RMB' | 'INR' | 'JPY' | 'CAD' | 'MXN'

enum CurrencyCodeEnum {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  RMB = 'RMB',
  INR = 'INR',
  JPY = 'JPY',
  CAD = 'CAD',
  MXN = 'MXN',
}

enum Status {
  Success = 'Success',
  ClientError = 'ClientError',
  ServiceError = 'ServiceError',
}

const MoneyType = Codec.interface({
  Amount: optional(number),
  CurrencyCode: oneOf(Object.values(CurrencyCodeEnum).map((x) => exactly(x))),
})

interface MoneyType {
  Amount: number | undefined
  CurrencyCode: CurrencyCodeEnum
}

const Points = Codec.interface({
  PointsNumber: number,
  PointsMonetaryValue: MoneyType,
})

type Points = GetInterface<typeof Points>
interface PriceToEstimateFees {
  ListingPrice: MoneyType
  Shipping?: MoneyType
  Points?: Points
}

interface FeeEstimateRequest {
  MarketplaceId: string
  IdType: string
  IdValue: string
  PriceToEstimateFees: PriceToEstimateFees
  Identifier: string
  IsAmazonFulfilled: boolean
}

interface GetMyFeesEstimateParameters {
  FeesEstimateRequestList: FeeEstimateRequest[]
  [key: string]: FeeEstimateRequest[]
}

const ErrorType = Codec.interface({
  Type: string,
  Code: string,
  Message: string,
})

enum IdType {
  ASIN = 'ASIN',
  SKU = 'SKU',
}

const PriceToEstimateFees = Codec.interface({
  ListingPrice: MoneyType,
  Shipping: optional(MoneyType),
  Points: optional(Points),
})

const FeesEstimateIdentifier = Codec.interface({
  MarketplaceId: string,
  IdType: oneOf(Object.values(IdType).map((x) => exactly(x))),
  IdValue: string,
  PriceToEstimateFees,
  SellerInputIdentifier: string,
  IsAmazonFulfilled: boolean,
})

interface FeeDetail {
  FeePromotion: MoneyType | undefined
  TaxAmount: MoneyType | undefined
  FinalFee: MoneyType
  FeeType: string
  FeeAmount: MoneyType
  IncludedFeeDetailList: FeeDetail[] | undefined
}

const FeeDetail: Codec<FeeDetail> = Codec.interface({
  FeeType: string,
  FeeAmount: MoneyType,
  FeePromotion: optional(MoneyType),
  TaxAmount: optional(MoneyType),
  FinalFee: MoneyType,
  IncludedFeeDetailList: optional(
    ensureArray(
      'IncludedFeeDetail',
      lazy(() => FeeDetail),
    ),
  ),
})

const FeesEstimate = Codec.interface({
  TimeOfFeesEstimation: mwsDate,
  TotalFeesEstimate: MoneyType,
  FeeDetailList: ensureArray('FeeDetail', FeeDetail),
})

const FeesEstimateResult = Codec.interface({
  FeesEstimateIdentifier,
  FeesEstimate: optional(FeesEstimate),
  Status: oneOf(Object.values(Status).map((x) => exactly(x))),
  Error: optional(ErrorType),
})

const GetMyFeesEstimate = Codec.interface({
  FeesEstimateResultList: ensureArray('FeesEstimateResult', FeesEstimateResult),
})

const GetMyFeesEstimateResponse = Codec.interface({
  GetMyFeesEstimateResponse: Codec.interface({
    GetMyFeesEstimateResult: GetMyFeesEstimate,
  }),
})

type GetMyFeesEstimate = GetInterface<typeof GetMyFeesEstimate>

interface ListMatchingProductsRequestParameters {
  MarketplaceId: string
  Query: string
  QueryContextId?: string
  [key: string]: string | undefined
}

const Product = record(string, unknown)

const ListMatchingProducts = Codec.interface({
  Products: ensureArray('Product', Product),
})

const ListMatchingProductsResponse = Codec.interface({
  ListMatchingProductsResponse: Codec.interface({
    ListMatchingProductsResult: ListMatchingProducts,
  }),
})

type ListMatchingProducts = GetInterface<typeof ListMatchingProducts>

interface GetMatchingProductParameters {
  ASINList: string[]
  MarketplaceId: string
  [key: string]: string[] | string
}

const GetMatchingProductResult = ensureArray(
  'GetMatchingProductResult',
  Codec.interface({
    Product,
  }),
)

const GetMatchingProductResponse = Codec.interface({
  GetMatchingProductResponse: GetMatchingProductResult,
})

type GetMatchingProductResult = GetInterface<typeof GetMatchingProductResult>

interface GetMatchingProductForIdParameters {
  MarketplaceId: string
  IdType: string
  IdList: string[]
  [key: string]: string | string[]
}

const MatchingProductForId = Codec.interface({
  Products: ensureArray('Product', Product),
})

const GetMatchingProductForIdResponse = ensureArray(
  'GetMatchingProductForIdResult',
  MatchingProductForId,
)

const GetMatchingProductForIdResponseCodec = Codec.interface({
  GetMatchingProductForIdResponse,
})

type GetMatchingProductForIdResponse = GetInterface<typeof GetMatchingProductForIdResponse>

interface GetCompetitivePricingForSkuParameters {
  MarketplaceId: string
  SellerSKUList: string[]
  [key: string]: string | string[]
}

const GetCompetitivePricingForSKUResult = ensureArray(
  'GetCompetitivePricingForSKUResult',
  Codec.interface({
    Product,
  }),
)

type GetCompetitivePricingForSKUResult = GetInterface<typeof GetCompetitivePricingForSKUResult>

const GetCompetitivePricingForSKUResponse = Codec.interface({
  GetCompetitivePricingForSKUResponse: GetCompetitivePricingForSKUResult,
})

const GetCompetitivePricingForASINResult = ensureArray(
  'GetCompetitivePricingForASINResult',
  Codec.interface({
    Product,
  }),
)

type GetCompetitivePricingForASINResult = GetInterface<typeof GetCompetitivePricingForASINResult>

interface GetCompetitivePricingForAsinParameters {
  MarketplaceId: string
  ASINList: string[]
  [key: string]: string | string[]
}

const GetCompetitivePricingForASINResponse = Codec.interface({
  GetCompetitivePricingForASINResponse: GetCompetitivePricingForASINResult,
})

interface ListMatchingProductsRequestParameters {
  MarketplaceId: string
  Query: string
  QueryContextId?: string
  [key: string]: string | undefined
}

const ListMatchingProducts = Codec.interface({
  Products: ensureArray('Product', unknown),
})

const ListMatchingProductsResponse = Codec.interface({
  ListMatchingProductsResponse: Codec.interface({
    ListMatchingProductsResult: ListMatchingProducts,
  }),
})

type ListMatchingProducts = GetInterface<typeof ListMatchingProducts>

interface GetMatchingProductForIdParameters {
  MarketplaceId: string
  IdType: string
  IdList: string[]
  [key: string]: string | string[]
}

const MatchingProductForId = Codec.interface({
  Products: ensureArray('Product', Product),
})

const GetMatchingProductForIdResponse = ensureArray(
  'GetMatchingProductForIdResult',
  MatchingProductForId,
)

const GetMatchingProductForIdResponseCodec = Codec.interface({
  GetMatchingProductForIdResponse,
})

type GetMatchingProductForIdResponse = GetInterface<typeof GetMatchingProductForIdResponse>

export class Products {
  constructor(private httpClient: HttpClient) {}

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
      parameters,
    })

    return GetMyFeesEstimateResponse.decode(response).caseOf({
      Right: (x) => [x.GetMyFeesEstimateResponse.GetMyFeesEstimateResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  /**
   *
   * @todo Think about converting GetMatchingProductResposne to array to match getMatchingProductForId
   */
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

  async getMatchingProductForId(
    parameters: GetMatchingProductForIdParameters,
  ): Promise<[GetMatchingProductForIdResponse, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Products,
      version: PRODUCTS_API_VERSION,
      action: 'GetMatchingProductForId',
      parameters,
    })

    return GetMatchingProductForIdResponseCodec.decode(response).caseOf({
      Right: (x) => [x.GetMatchingProductForIdResponse, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }
}
