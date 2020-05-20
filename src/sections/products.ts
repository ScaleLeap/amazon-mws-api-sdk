import { boolean, Codec, exactly, GetInterface, number, oneOf, optional, string } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { ensureArray, mwsDate } from '../parsing'
// import { getServiceStatusByResource } from './shared'

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
  Amount?: number
  CurrencyCode?: CurrencyCode
}

const Points = Codec.interface({
  PointsNumber: number,
  PointsMonetaryValue: MoneyType,
})

interface Points {
  PointsNumber: number
  PointsMonetaryValue: MoneyType
}

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

enum FeeType {
  ReferralFee = 'ReferralFee',
  VariableClosingFee = 'VariableClosingFee',
  PerItemFee = 'PerItemFee',
  FBAFees = 'FBAFees',
  FBAPickAndPack = 'FBAPickAndPack',
  FBAWeightHandling = 'FBAWeightHandling',
  FBAOrderHandling = 'FBAOrderHandling',
  FBADeliveryServicesFee = 'FBADeliveryServicesFee',
}

const FeeDetail = Codec.interface({
  FeeType: oneOf(Object.values(FeeType).map((x) => exactly(x))),
  FeeAmount: MoneyType,
  FeePromotion: optional(MoneyType),
  TaxAmount: optional(MoneyType),
  FinalFee: MoneyType,
  // IncludedFeeDetailList: optional(ensureArray('IncludedFeeDetail', FeeDetail)) // Need to think about how to get around this
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

type GetMyFeesEstimateResponse = GetInterface<typeof GetMyFeesEstimate>

export class Products {
  constructor(private httpClient: HttpClient) {}

  async getMyFeesEstimate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _parameters: GetMyFeesEstimateParameters,
  ): Promise<[GetMyFeesEstimateResponse, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Products,
      version: PRODUCTS_API_VERSION,
      action: 'GetMyFeesEstimate',
      parameters: {}, // Patch after pushing fix to clean dependencies to master
    })

    return GetMyFeesEstimateResponse.decode(response).caseOf({
      Right: (x) => [x.GetMyFeesEstimateResponse.GetMyFeesEstimateResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }
}
