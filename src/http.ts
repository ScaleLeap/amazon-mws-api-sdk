import { AmazonMarketplace } from '@scaleleap/amazon-marketplaces'
import axios from 'axios'
import parser from 'fast-xml-parser'
import { decode } from 'html-entities'
import { URLSearchParams } from 'url'

import { USER_AGENT } from './constants'
import {
  AccessDeniedError,
  AccessToFeedProcessingResultDeniedError,
  AccessToReportDeniedError,
  ContentMD5DoesNotMatchError,
  ContentMD5MissingError,
  DependencyFatalExceptionError,
  DependencyRetriableExceptionError,
  DependencyUnauthorizedExceptionError,
  enhanceError,
  FeedCanceledError,
  FeedProcessingResultNoLongerAvailableError,
  FeedProcessingResultNotReadyError,
  InputDataErrorError,
  InputStreamDisconnectedError,
  InternalErrorError,
  InternalErrorFatalExceptionError,
  InvalidAccessKeyIdError,
  InvalidAddressError,
  InvalidFeedSubmissionIdError,
  InvalidFeedTypeError,
  InvalidInputFatalExceptionError,
  InvalidOrderStateError,
  InvalidParameterValueError,
  InvalidReportIdError,
  InvalidReportRequestIdError,
  InvalidReportTypeError,
  InvalidRequestError,
  InvalidScheduleFrequencyError,
  InvalidUPCIdentifierError,
  NonRetriableInternalErrorError,
  ParsingError,
  PickupSlotNotAvailableError,
  QuotaExceededError,
  RegionNotSupportedError,
  ReportNoLongerAvailableError,
  ReportNotReadyError,
  RequestThrottledError,
  ResourceNotFoundError,
  RetriableInternalErrorError,
  ScheduledPackageAlreadyExistsError,
  ScheduleWindowExpiredError,
  SignatureDoesNotMatchError,
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

export type HttpMethod = 'GET' | 'POST'
export type ParameterTypes =
  | string
  | number
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (number | string | object)[]
  | boolean
  | { [key: string]: ParameterTypes }
  | undefined

export type Parameters = Record<string, ParameterTypes>
export type CleanParameters = Record<string, string>

export enum Resource {
  FulfilmentInventory = 'FulfillmentInventory',
  Orders = 'Orders',
  Products = 'Products',
  Reports = 'Reports',
  Finances = 'Finances',
  Sellers = 'Sellers',
  Subscriptions = 'Subscriptions',
  Feeds = 'Feeds',
  ShipmentInvoicing = 'ShipmentInvoicing',
  Recommendations = 'Recommendations',
  MerchantFulfillment = 'MerchantFulfillment',
  FulfillmentInboundShipment = 'FulfillmentInboundShipment',
  FulfillmentOutboundShipment = 'FulfillmentOutboundShipment',
  EasyShip = 'EasyShip',
}

export interface ResourceActions {
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
  [Resource.Reports]:
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
  [Resource.Finances]:
    | 'ListFinancialEventGroups'
    | 'ListFinancialEventGroupsByNextToken'
    | 'ListFinancialEvents'
    | 'ListFinancialEventsByNextToken'
  [Resource.Subscriptions]:
    | 'RegisterDestination'
    | 'DeregisterDestination'
    | 'ListRegisteredDestinations'
    | 'SendTestNotificationToDestination'
    | 'CreateSubscription'
    | 'GetSubscription'
    | 'DeleteSubscription'
    | 'ListSubscriptions'
    | 'UpdateSubscription'
    | 'GetServiceStatus'
  [Resource.Feeds]:
    | 'SubmitFeed'
    | 'GetFeedSubmissionList'
    | 'GetFeedSubmissionListByNextToken'
    | 'GetFeedSubmissionCount'
    | 'CancelFeedSubmissions'
    | 'GetFeedSubmissionResult'
  [Resource.ShipmentInvoicing]:
    | 'GetFBAOutboundShipmentDetail'
    | 'SubmitFBAOutboundShipmentInvoice'
    | 'GetFBAOutboundShipmentInvoiceStatus'
    | 'GetServiceStatus'
  [Resource.MerchantFulfillment]:
    | 'GetEligibleShippingServices'
    | 'GetAdditionalSellerInputs'
    | 'CreateShipment'
    | 'GetShipment'
    | 'CancelShipment'
    | 'GetServiceStatus'
  [Resource.FulfillmentInboundShipment]:
    | 'GetInboundGuidanceForSKU'
    | 'GetInboundGuidanceForASIN'
    | 'CreateInboundShipmentPlan'
    | 'CreateInboundShipment'
    | 'UpdateInboundShipment'
    | 'GetPreorderInfo'
    | 'ConfirmPreorder'
    | 'GetPrepInstructionsForSKU'
    | 'GetPrepInstructionsForASIN'
    | 'PutTransportContent'
    | 'EstimateTransportRequest'
    | 'GetTransportContent'
    | 'ConfirmTransportRequest'
    | 'VoidTransportRequest'
    | 'GetPackageLabels'
    | 'GetUniquePackageLabels'
    | 'GetPalletLabels'
    | 'GetBillOfLading'
    | 'ListInboundShipments'
    | 'ListInboundShipmentsByNextToken'
    | 'ListInboundShipmentItems'
    | 'ListInboundShipmentItemsByNextToken'
    | 'GetServiceStatus'
  [Resource.Recommendations]:
    | 'GetLastUpdatedTimeForRecommendations'
    | 'ListRecommendations'
    | 'ListRecommendationsByNextToken'
    | 'GetServiceStatus'
  [Resource.FulfillmentOutboundShipment]:
    | 'GetFulfillmentPreview'
    | 'CreateFulfillmentOrder'
    | 'UpdateFulfillmentOrder'
    | 'ListAllFulfillmentOrders'
    | 'GetFulfillmentOrder'
    | 'ListAllFulfillmentOrdersByNextToken'
    | 'GetPackageTrackingDetails'
    | 'CancelFulfillmentOrder'
    | 'ListReturnReasonCodes'
    | 'CreateFulfillmentReturn'
    | 'GetServiceStatus'
  [Resource.EasyShip]:
    | 'ListPickupSlots'
    | 'CreateScheduledPackage'
    | 'UpdateScheduledPackages'
    | 'GetScheduledPackage'
    | 'GetServiceStatus'
}

export interface Request {
  url: string
  method: HttpMethod
  headers: Record<string, string>
  data?: string
}

export interface ResourceInfo<TResource extends Resource> {
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

export interface RequestResponse {
  data: string
  headers: Record<string, string>
}

/**
 * `SubmitFeed` and `SubmitFBAOutboundShipmentInvoice` has the feed passed as an XML file in the body
 * and the other parameters as query parameters
 */
const REQUEST_HAS_BODY = new Set(['SubmitFeed', 'SubmitFBAOutboundShipmentInvoice'])

const canonicalizeParameters = (parameters: CleanParameters): string => {
  const sp = new URLSearchParams(parameters)
  sp.sort()
  return sp.toString().replace(/\+/g, '%20')
}

export const cleanParameters = (
  parameters: Parameters,
  baseObject: Record<string, string> = {},
  outerKey?: string,
): CleanParameters =>
  Object.entries(parameters)

    // Filter undefined
    .filter(([, parameter]) => parameter !== undefined)

    // Loop through each key
    // eslint-disable-next-line unicorn/no-array-reduce
    .reduce((_, [key, parameter]) => {
      const trueKey = outerKey ? `${outerKey}.${key}` : key
      /**
       * If parameter is type string, number, boolean assign it to result
       */
      if (
        typeof parameter === 'string' ||
        !Number.isNaN(Number(parameter)) ||
        typeof parameter === 'boolean'
      ) {
        Object.assign(baseObject, { [trueKey]: String(parameter) })
      } else if (Array.isArray(parameter)) {
        /**
         * If parameter is type array reduce it to dotnotation
         */
        // eslint-disable-next-line @typescript-eslint/ban-types, unicorn/no-array-for-each
        parameter.forEach((parameterChild: object | string | number | boolean, index: number) => {
          if (
            typeof parameterChild === 'string' ||
            !Number.isNaN(Number(parameterChild)) ||
            typeof parameter === 'boolean'
          ) {
            Object.assign(baseObject, { [`${trueKey}.${index + 1}`]: String(parameterChild) })
          } else {
            cleanParameters(parameterChild as Parameters, baseObject, `${trueKey}.${index + 1}`)
          }
        })
      } else {
        /**
         * If parameter is type object parameterize it
         */
        cleanParameters(parameter as Parameters, baseObject, `${trueKey}`)
      }

      return baseObject
    }, {} as CleanParameters)

const defaultFetch = ({ url, method, headers, data }: Request): Promise<RequestResponse> =>
  axios({ method, url, headers, data })
    .then((response) => ({
      data: response.data,
      headers: response.headers,
    }))
    .catch((error) => {
      if (error.response) {
        return Promise.reject(error.response.data)
      }
      if (error.request) {
        return Promise.reject(error.request)
      }
      return Promise.reject(error)
    })

export const parseResponse = <T>(
  response: RequestResponse,
  parseString = false,
): [T | string, RequestMeta] => {
  let responseData
  if (parseString) {
    responseData = response.data
  } else {
    try {
      responseData = parser.parse(
        response.data,
        {
          attributeNamePrefix: '',
          ignoreAttributes: false,
          parseAttributeValue: false,
          parseNodeValue: false,
          attrNodeName: 'attr',
          textNodeName: 'text',
          parseTrueNumberOnly: true,
          tagValueProcessor: (value) => decode(value),
        },
        true,
      )
    } catch (error) {
      throw new ParsingError(error.message)
    }
  }
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
    private fetch: (meta: Request) => Promise<RequestResponse> = defaultFetch,
  ) {}

  public async request<TResource extends Resource, TResponse>(
    method: HttpMethod,
    info: ResourceInfo<TResource>,
    body?: string,
    stringResponse = false,
  ): Promise<[TResponse | string, RequestMeta]> {
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
      'user-agent': `${USER_AGENT} (Language=Javascript)`,
    }

    let config: Request
    if (method === 'GET') {
      config = {
        url: `${url}?${canonicalizeParameters(parametersWithSignature)}`,
        method,
        headers,
      }
    } else if (body && REQUEST_HAS_BODY.has(info.action)) {
      config = {
        url: `${url}?${canonicalizeParameters(parametersWithSignature)}`,
        method,
        headers: {
          'Content-Type': 'text/xml',
          ...headers,
        },
        data: body,
      }
    } else {
      config = {
        url,
        method,
        headers,
        data: canonicalizeParameters(parametersWithSignature),
      }
    }

    try {
      const response = await this.fetch(config)

      // GetMatchingProductForId can return an Invalid UPC identifier error message to an otherwise successfully processed request (i.e. 200 status code)
      if (
        info.action === 'GetMatchingProductForId' &&
        response.data.includes('Invalid UPC identifier')
      ) {
        throw new InvalidUPCIdentifierError(`${info.action} request failed`)
      }

      return parseResponse(response, stringResponse)
    } catch (error) {
      if (parser.validate(error) !== true) {
        throw error
      }

      const maybeResponse = MWSApiError.decode(parser.parse(error))

      if (maybeResponse.isRight()) {
        const response = maybeResponse.extract()
        const errorCode = response.ErrorResponse.Error.Code

        const errorMap = {
          InputStreamDisconnected: InputStreamDisconnectedError,
          InvalidParameterValue: InvalidParameterValueError,
          AccessDenied: AccessDeniedError,
          InvalidAccessKeyId: InvalidAccessKeyIdError,
          SignatureDoesNotMatch: SignatureDoesNotMatchError,
          InvalidAddress: InvalidAddressError,
          InternalError: InternalErrorError,
          // Subscriptions-fispecic
          'Internal Error': InternalErrorError,
          QuotaExceeded: QuotaExceededError,
          RequestThrottled: RequestThrottledError,
          ResourceNotFound: ResourceNotFoundError,
          ScheduledPackageAlreadyExists: ScheduledPackageAlreadyExistsError,
          RegionNotSupported: RegionNotSupportedError,
          ScheduleWindowExpired: ScheduleWindowExpiredError,
          InvalidOrderState: InvalidOrderStateError,
          PickupSlotNotAvailable: PickupSlotNotAvailableError,
          AccessToFeedProcessingResultDenied: AccessToFeedProcessingResultDeniedError,
          ContentMD5Missing: ContentMD5MissingError,
          ContentMD5DoesNotMatch: ContentMD5DoesNotMatchError,
          FeedCanceled: FeedCanceledError,
          FeedProcessingResultNoLongerAvailable: FeedProcessingResultNoLongerAvailableError,
          FeedProcessingResultNotReady: FeedProcessingResultNotReadyError,
          InputDataError: InputDataErrorError,
          InvalidFeedSubmissionId: InvalidFeedSubmissionIdError,
          InvalidFeedType: InvalidFeedTypeError,
          InvalidRequest: InvalidRequestError,
          NonRetriableInternalError: NonRetriableInternalErrorError,
          RetriableInternalError: RetriableInternalErrorError,
          AccessToReportDenied: AccessToReportDeniedError,
          InvalidReportId: InvalidReportIdError,
          InvalidReportRequestId: InvalidReportRequestIdError,
          InvalidReportType: InvalidReportTypeError,
          InvalidScheduleFrequency: InvalidScheduleFrequencyError,
          ReportNoLongerAvailable: ReportNoLongerAvailableError,
          ReportNotReady: ReportNotReadyError,
          DependencyFatalException: DependencyFatalExceptionError,
          DependencyRetriableException: DependencyRetriableExceptionError,
          DependencyUnauthorizedException: DependencyUnauthorizedExceptionError,
          InternalErrorFatalException: InternalErrorFatalExceptionError,
          InvalidInputFatalException: InvalidInputFatalExceptionError,
        }

        const ErrorToThrow = errorMap[errorCode as keyof typeof errorMap]

        throw enhanceError(new ErrorToThrow(`${info.action} request failed`), response)
      } else {
        throw error
      }
    }
  }
}
