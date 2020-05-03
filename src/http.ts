import { AmazonMarketplace } from '@scaleleap/amazon-marketplaces'
import axios from 'axios'
import { URLSearchParams } from 'url'

import { sign } from './sign'

export interface MWSOptions {
  marketplace: AmazonMarketplace
  awsAccessKeyId: string
  mwsAuthToken: string
  sellerId: string
  secretKey: string
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

const urlEncode = (string: string): string =>
  encodeURIComponent(string).replace('+', '%20').replace('*', '%2A').replace('%7E', '~')

const canonicalizeParameters = (parameters: Parameters): string => {
  const sp = new URLSearchParams(parameters)
  sp.sort()
  return urlEncode(sp.toString())
}

const defaultFetch = ({ url, method, headers }: Request) =>
  axios({ method, url, headers }).then((response) => response.data)

export class HttpClient {
  constructor(
    private options: MWSOptions,
    private fetch: <T>(meta: Request) => Promise<T> = defaultFetch, // eslint-disable-next-line no-empty-function
  ) {}

  request(method: HttpMethod, info: ResourceInfo) {
    const marketplaceUri = this.options.marketplace.webServiceUri

    const host = marketplaceUri.replace('https://', '')
    const url = `${marketplaceUri}/${info.resource}/${info.version}`

    const parameters = {
      AWSAccessKeyId: urlEncode(this.options.awsAccessKeyId),
      Action: urlEncode(info.action),
      MWSAuthToken: urlEncode(this.options.mwsAuthToken),
      SellerId: urlEncode(this.options.sellerId),
      SignatureMethod: urlEncode('HmacSHA256'),
      SignatureVersion: urlEncode('2'),
      Timestamp: urlEncode(new Date().toISOString()),
      Version: urlEncode(info.version),
      ...info.parameters,
    }

    const parametersForSigning = canonicalizeParameters(parameters)
    const queryStringToSign = `${method}\n${host}\n/${info.resource}/${info.version}\n${parametersForSigning}`

    const signature = sign(queryStringToSign, this.options.secretKey)
    const parametersWithSignature = { ...parameters, Signature: urlEncode(signature) }

    return this.fetch({
      url: `${url}?${canonicalizeParameters(parametersWithSignature)}`,
      method,
      headers: {
        'user-agent': '@scaleleap/amazon-mws-api-sdk/1.0.0 (Language=JavaScript)',
      },
    })
  }
}
