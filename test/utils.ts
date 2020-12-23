import { readFileSync } from 'fs'
import path from 'path'

import { amazonMarketplaces, HttpClient, MWS } from '../src'

export const httpConfig = {
  awsAccessKeyId: '',
  marketplace: amazonMarketplaces.CA,
  mwsAuthToken: '',
  secretKey: '',
  sellerId: '',
}

export const headers = {
  'x-mws-request-id': '0',
  'x-mws-timestamp': '2020-05-06T09:22:23.582Z',
  'x-mws-quota-max': '1000',
  'x-mws-quota-remaining': '999',
  'x-mws-quota-resetson': '2020-04-06T10:22:23.582Z',
}

export const getFixture = (filename: string): string =>
  readFileSync(path.join(__dirname, `unit/__fixtures__/${filename}.xml`), { encoding: 'utf8' })

export const createMockHttpClient = (fixture: string) =>
  new MWS(
    new HttpClient(httpConfig, () =>
      Promise.resolve({
        data: getFixture(fixture),
        headers,
      }),
    ),
  )

export const mockMwsFail = new MWS(
  new HttpClient(httpConfig, () => Promise.resolve({ data: '', headers: {} })),
)

export const mockParsingError = new MWS(
  new HttpClient(httpConfig, () => Promise.resolve({ data: '<xml></xml>', headers: {} })),
)
export const mockMwsServiceStatus = createMockHttpClient('get_service_status')

export const parsingErrorRegex = /Problem with property "(.*?)": it does not exist in received object {"xml":""}/
