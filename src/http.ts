import { AmazonMarketplace } from '@scaleleap/amazon-marketplaces'
import axios from 'axios'
import parser from 'fast-xml-parser'
import { URLSearchParams } from 'url'

import {
  AccessDenied,
  AccessToFeedProcessingResultDenied,
  AccessToReportDenied,
  ContentMD5DoesNotMatch,
  ContentMD5Missing,
  DependencyFatalException,
  DependencyRetriableException,
  DependencyUnauthorizedException,
  enhanceError,
  FeedCanceled,
  FeedProcessingResultNoLongerAvailable,
  FeedProcessingResultNotReady,
  InputDataError,
  InputStreamDisconnected,
  InternalError,
  InternalErrorFatalException,
  InvalidAccessKeyId,
  InvalidAddress,
  InvalidFeedSubmissionId,
  InvalidFeedType,
  InvalidInputFatalException,
  InvalidOrderState,
  InvalidParameterValue,
  InvalidReportId,
  InvalidReportType,
  InvalidRequest,
  InvalidScheduleFrequency,
  InvalidUPCIdentifier,
  NonRetriableInternalError,
  PickupSlotNotAvailable,
  QuotaExceeded,
  RegionNotSupported,
  ReportNoLongerAvailable,
  ReportNotReady,
  RequestThrottled,
  ResourceNotFound,
  RetriableInternalError,
  ScheduledPackageAlreadyExists,
  ScheduleWindowExpired,
  SignatureDoesNotMatch,
} from './error'
import { MWSApiError } from './error-codec'
import { sign } from './sign'

export interface MWSOptions {
  marketplace: AmazonMarketplace
  awsAccessKeyId: string
  mwsAuthToken: string
  sellerId: string
  secretKey: string
}

type HttpMethod = 'GET' | 'POST'
type ParameterTypes = string | number | (number | string)[] | object[] | boolean | undefined
type Parameters = Record<string, ParameterTypes>
type CleanParameters = Record<string, string>

export enum Resource {
  Sellers = 'Sellers',
  Orders = 'Orders',
  Products = 'Products',
  FulfilmentInventory = 'FulfillmentInventory',
  Report = 'Report',
}

interface ResourceActions {
  [Resource.Sellers]:
    | 'ListMarketplaceParticipations'
    | 'ListMarketplaceParticipationsByNextToken'
    | 'GetServiceStatus'
  [Resource.Orders]:
    | 'ListOrders'
    | 'ListOrdersByNextToken'
    | 'GetOrder'
    | 'ListOrderItems'
    | 'ListOrderItemsByNextToken'
    | 'GetServiceStatus'
  [Resource.Products]:
    | 'ListMatchingProducts'
    | 'GetMatchingProduct'
    | 'GetMatchingProductForId'
    | 'GetCompetitivePricingForSKU'
    | 'GetCompetitivePricingForASIN'
    | 'GetLowestOfferListingsForSKU'
    | 'GetLowestOfferListingsForASIN'
    | 'GetLowestPricedOffersForSKU'
    | 'GetLowestPricedOffersForASIN'
    | 'GetMyFeesEstimate'
    | 'GetMyPriceForSKU'
    | 'GetMyPriceForASIN'
    | 'GetProductCategoriesForSKU'
    | 'GetProductCategoriesForASIN'
    | 'GetServiceStatus'
  [Resource.FulfilmentInventory]:
    | 'ListInventorySupply'
    | 'ListInventorySupplyByNextToken'
    | 'GetServiceStatus'
  [Resource.Report]:
    | 'RequestReport'
    | 'GetReportRequestList'
    | 'GetReportRequestListByNextToken'
    | 'GetReportRequestCount'
    | 'CancelReportRequests'
    | 'GetReportList'
    | 'GetReportListByNextToken'
    | 'GetReportCount'
    | 'GetReport'
    | 'ManageReportSchedule'
    | 'GetReportScheduleList'
    | 'GetReportScheduleListByNextToken'
    | 'GetReportScheduleCount'
    | 'UpdateReportAcknowledgements'
}

interface Request {
  url: string
  method: HttpMethod
  headers: Record<string, string>
  data?: string
}

interface ResourceInfo<TResource extends Resource> {
  resource: TResource
  version: string
  action: ResourceActions[TResource]
  parameters: Parameters
}

export interface RequestMeta {
  requestId: string
  timestamp: Date
  quotaMax: number
  quotaRemaining: number
  quotaResetOn: Date
}

interface RequestResponse {
  data: string
  headers: Record<string, string>
}

const canonicalizeParameters = (parameters: CleanParameters): string => {
  const sp = new URLSearchParams(parameters)
  sp.sort()
  return sp.toString().replace(/\+/g, '%20')
}

export const toDotNotation = (object: object, prefix: string) => {
  const result: { [key: string]: string | number | boolean } = {}
  function dotify(plainObject: object, currentKey?: string | number) {
    Object.entries(plainObject).forEach(([key, value]) => {
      const newKey = currentKey ? `${currentKey}.${key}` : key // joined key with dot
      if (value && typeof value === 'object') {
        dotify(value, newKey) // it's a nested object, so do it again
      } else {
        Object.assign(result, { [`${prefix}.${newKey}`]: value }) // it's not an object, so set the property
      }
    })
  }

  dotify(object)
  return result
}

export const cleanParameters = (parameters: Parameters): CleanParameters =>
  Object.entries(parameters)
    .filter(([, parameter]) => parameter !== undefined)
    .reduce((result, [key, parameter]) => {
      if (Array.isArray(parameter)) {
        parameter.forEach((parameterChild: string | number | object, index: number) => {
          if (typeof parameterChild === 'string' || !Number.isNaN(Number(parameterChild))) {
            Object.assign(result, { [`${key}.${index + 1}`]: String(parameterChild) })
          } else {
            Object.assign(result, toDotNotation(parameterChild as object, `${key}.${index + 1}`))
          }
        })
      } else {
        Object.assign(result, { [key]: String(parameter) })
      }

      return result
    }, {} as CleanParameters)

const defaultFetch = ({ url, method, headers, data }: Request): Promise<RequestResponse> =>
  axios({ method, url, headers, data })
    .then((response) => ({
      data: response.data,
      headers: response.headers,
    }))
    .catch((error) => {
      return Promise.reject(error.response.data)
    })

const parseGetReport = (response: RequestResponse): [string, RequestMeta] => [
  response.data,
  {
    requestId: response.headers['x-mws-request-id'],
    timestamp: new Date(response.headers['x-mws-timestamp']),
    quotaMax: Number(response.headers['x-mws-quota-max']),
    quotaRemaining: Number(response.headers['x-mws-quota-remaining']),
    quotaResetOn: new Date(response.headers['x-mws-quota-resetson']),
  },
]

const parseResponse = <T>(response: RequestResponse): [T, RequestMeta] => {
  const responseData = parser.parse(response.data)
  return [
    responseData,
    {
      requestId: response.headers['x-mws-request-id'],
      timestamp: new Date(response.headers['x-mws-timestamp']),
      quotaMax: Number(response.headers['x-mws-quota-max']),
      quotaRemaining: Number(response.headers['x-mws-quota-remaining']),
      quotaResetOn: new Date(response.headers['x-mws-quota-resetson']),
    },
  ]
}

export class HttpClient {
  constructor(
    private options: MWSOptions,
    private fetch: <T>(meta: Request) => Promise<RequestResponse> = defaultFetch,
  ) {}

  public async request<TResource extends Resource, TRes>(
    method: HttpMethod,
    info: ResourceInfo<TResource>,
  ): Promise<[TRes | string, RequestMeta]> {
    const marketplaceUri = this.options.marketplace.webServiceUri

    const host = marketplaceUri.replace('https://', '')
    const url = `${marketplaceUri}/${info.resource}/${info.version}`

    const parameters = {
      AWSAccessKeyId: this.options.awsAccessKeyId,
      Action: info.action,
      MWSAuthToken: this.options.mwsAuthToken,
      SellerId: this.options.sellerId,
      SignatureMethod: 'HmacSHA256',
      SignatureVersion: '2',
      Timestamp: new Date().toISOString(),
      Version: info.version,
      ...cleanParameters(info.parameters),
    }

    const parametersForSigning = canonicalizeParameters(parameters)
    const queryStringToSign = `${method}\n${host}\n/${info.resource}/${info.version}\n${parametersForSigning}`

    const signature = sign(queryStringToSign, this.options.secretKey)
    const parametersWithSignature = { ...parameters, Signature: signature }

    const headers = {
      'user-agent': '@scaleleap/amazon-mws-api-sdk/1.0.0 (Language=JavaScript)',
    }

    const config =
      method === 'GET'
        ? {
            url: `${url}?${canonicalizeParameters(parametersWithSignature)}`,
            method,
            headers,
          }
        : {
            url,
            method,
            headers,
            data: canonicalizeParameters(parametersWithSignature),
          }

    try {
      const response = await this.fetch(config)

      // GetMatchingProductForId can return an Invalid UPC identifier error message to an otherwise successfully processed request (i.e. 200 status code)
      if (
        info.action === 'GetMatchingProductForId' &&
        response.data.includes('Invalid UPC identifier')
      ) {
        throw new InvalidUPCIdentifier(`${info.action} request failed`)
      }

      // GetReport returns a string that should be treated as a file instead of XML data
      // http://docs.developer.amazonservices.com/en_CA/reports/Reports_GetReport.html
      if (info.action === 'GetReport') {
        return parseGetReport(response)
      }

      return parseResponse(response)
    } catch (error) {
      if (parser.validate(error) !== true) {
        throw error
      }

      const maybeResponse = MWSApiError.decode(parser.parse(error))

      if (maybeResponse.isRight()) {
        const response = maybeResponse.extract()
        const errorCode = response.ErrorResponse.Error.Code

        const errorMap = {
          InputStreamDisconnected,
          InvalidParameterValue,
          AccessDenied,
          InvalidAccessKeyId,
          SignatureDoesNotMatch,
          InvalidAddress,
          InternalError,
          // Subscriptions-specific
          'Internal Error': InternalError,
          QuotaExceeded,
          RequestThrottled,
          ResourceNotFound,
          ScheduledPackageAlreadyExists,
          RegionNotSupported,
          ScheduleWindowExpired,
          InvalidOrderState,
          PickupSlotNotAvailable,
          AccessToFeedProcessingResultDenied,
          ContentMD5Missing,
          ContentMD5DoesNotMatch,
          FeedCanceled,
          FeedProcessingResultNoLongerAvailable,
          FeedProcessingResultNotReady,
          InputDataError,
          InvalidFeedSubmissionId,
          InvalidFeedType,
          InvalidRequest,
          NonRetriableInternalError,
          RetriableInternalError,
          AccessToReportDenied,
          InvalidReportId,
          InvalidReportType,
          InvalidScheduleFrequency,
          ReportNoLongerAvailable,
          ReportNotReady,
          DependencyFatalException,
          DependencyRetriableException,
          DependencyUnauthorizedException,
          InternalErrorFatalException,
          InvalidInputFatalException,
        }

        const ErrorToThrow = errorMap[errorCode]

        throw enhanceError(new ErrorToThrow(`${info.action} request failed`), response)
      } else {
        throw error
      }
    }
  }
}
