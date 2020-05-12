import { AmazonMarketplace } from '@scaleleap/amazon-marketplaces'
import axios from 'axios'
import parser from 'fast-xml-parser'
import { URLSearchParams } from 'url'

import {
  AccessDenied,
  enhanceError,
  InputStreamDisconnected,
  InternalError,
  InvalidAccessKeyId,
  InvalidAddress,
  InvalidParameterValue,
  MWSApiError,
  QuotaExceeded,
  RequestThrottled,
  SignatureDoesNotMatch,
} from './error'
import { sign } from './sign'

export interface MWSOptions {
  marketplace: AmazonMarketplace
  awsAccessKeyId: string
  mwsAuthToken: string
  sellerId: string
  secretKey: string
}

type HttpMethod = 'GET' | 'POST'
type Parameters = Record<string, string | number | (number | string)[] | undefined>
type CleanParameters = Record<string, string>

export enum Resource {
  Sellers = 'Sellers',
  Orders = 'Orders',
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
  timestamp: string
  quotaMax: number
  quotaRemaining: number
  quotaResetOn: string
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

/* eslint-disable no-param-reassign */
const cleanParameters = (parameters: Parameters): CleanParameters =>
  Object.entries(parameters)
    .filter(([, v]) => v !== undefined)
    .reduce((result, [k, v]) => {
      if (Array.isArray(v)) {
        for (let index = 0; index < v.length; index += 1) {
          result[`${k}.${index + 1}`] = String(v)
        }
      } else {
        result[k] = String(v)
      }

      return result
    }, {} as CleanParameters)
/* eslint-enable no-param-reassign */

const defaultFetch = ({ url, method, headers, data }: Request): Promise<RequestResponse> =>
  axios({ method, url, headers, data })
    .then((response) => ({
      data: response.data,
      headers: response.headers,
    }))
    .catch((error) => error.response.data)

const parseResponse = <T>(response: RequestResponse): [T, RequestMeta] => {
  const responseData = parser.parse(response.data)

  return [
    responseData,
    {
      requestId: response.headers['x-mws-request-id'],
      timestamp: response.headers['x-mws-timestamp'],
      quotaMax: Number(response.headers['x-mws-quota-max']),
      quotaRemaining: Number(response.headers['x-mws-quota-remaining']),
      quotaResetOn: response.headers['x-mws-quota-resetson'],
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
  ): Promise<[TRes, RequestMeta]> {
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
      return await this.fetch(config).then((x) => parseResponse(x))
    } catch (error) {
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
          QuotaExceeded,
          RequestThrottled,
        }

        const ErrorToThrow = errorMap[errorCode]

        throw enhanceError(new ErrorToThrow(`Request failed with ${errorCode}`), response)
      }

      throw error
    }
  }
}
