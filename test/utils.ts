import { readFileSync } from 'fs'
import { join } from 'path'

import { amazonMarketplaces, HttpClient, MWS } from '../src'

const httpConfig = {
  awsAccessKeyId: '',
  marketplace: amazonMarketplaces.CA,
  mwsAuthToken: '',
  secretKey: '',
  sellerId: '',
}

const headers = {
  'x-mws-request-id': '0',
  'x-mws-timestamp': '2020-05-06T09:22:23.582Z',
  'x-mws-quota-max': '1000',
  'x-mws-quota-remaining': '999',
  'x-mws-quota-resetson': '2020-04-06T10:22:23.582Z',
}

export const getFixture = (filename: string): string =>
  readFileSync(join(__dirname, `unit/__fixtures__/${filename}.xml`), { encoding: 'utf8' })

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

export const parsingError = 'Expected an object, but received a string with value ""'

export const mockMwsServiceStatus = createMockHttpClient('get_service_status')
