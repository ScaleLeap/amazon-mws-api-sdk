import axios from 'axios'
import { URLSearchParams } from 'url'

import { sign } from './sign'

export interface MWSOptions {
  endpoint: string
  awsAccessKeyId: string
  mwsAuthToken: string
  sellerId: string
  secret: string
  httpClient?: HttpClient
}

type HttpMethod = 'GET' | 'POST'
type Parameters = Record<string, string | string[]>

export enum Resource {
  Sellers = 'Sellers',
}

interface Request {
  url: string
  method: HttpMethod
  headers: Record<string, string>
}

interface ResourceInfo {
  resource: Resource
  version: string
  action: string
  parameters: Parameters
}

const canonicalizeParameters = (parameters: Parameters): string => {
  const sp = new URLSearchParams(parameters)
  sp.sort()
  return sp.toString().replace(/\+/g, '%20')
}

const defaultFetch = ({ url, method, headers }: Request) =>
  axios({ method, url, headers }).then((response) => response.data)

export class HttpClient {
  constructor(
    private options: MWSOptions,
    private fetch: <T>(meta: Request) => Promise<T> = defaultFetch, // eslint-disable-next-line no-empty-function
  ) {}

  request(method: HttpMethod, info: ResourceInfo) {
    const host = this.options.endpoint.replace('https://', '')
    const url = `${this.options.endpoint}/${info.resource}/${info.version}/`

    const parameters = {
      AWSAccessKeyId: this.options.awsAccessKeyId,
      Action: info.action,
      MWSAuthToken: this.options.mwsAuthToken,
      SellerId: this.options.sellerId,
      SignatureMethod: 'HmacSHA256',
      SignatureVersion: '2',
      Timestamp: new Date().toISOString(),
      Version: info.version,
      ...info.parameters,
    }

    const parametersForSigning = canonicalizeParameters(parameters)
    const queryStringToSign = `${method}\n${host}\n/${info.resource}/${info.version}\n${parametersForSigning}`

    const signature = sign(queryStringToSign, this.options.secret)
    const parametersWithSignature = { ...parameters, Signature: signature }

    return this.fetch({
      url: `${url}?${canonicalizeParameters(parametersWithSignature)}`,
      method,
      headers: {
        'user-agent': '@scaleleap/amazon-mws-api-sdk/1.0.0 (Language=JavaScript)',
      },
    })
  }
}
