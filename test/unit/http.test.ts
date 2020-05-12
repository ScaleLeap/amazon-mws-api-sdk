import {
  amazonMarketplaces,
  HttpClient,
  HttpError,
  InvalidParameterValue,
  MWSError,
} from '../../src'
import { Resource } from '../../src/http'
import { getFixture } from '../utils'

const httpClientThatThrows = (error: unknown) =>
  new HttpClient(
    {
      awsAccessKeyId: '',
      marketplace: amazonMarketplaces.CA,
      mwsAuthToken: '',
      secretKey: '',
      sellerId: '',
    },
    () => {
      throw error
    },
  )

const mockRequest = {
  resource: Resource.Sellers,
  version: '',
  action: 'GetServiceStatus',
  parameters: {},
} as const

describe('httpClient', () => {
  it('should throw a HttpError on failure', async () => {
    expect.assertions(1)

    const httpClient = httpClientThatThrows(getFixture('error-response'))

    await expect(() => httpClient.request('POST', mockRequest)).rejects.toStrictEqual(
      new InvalidParameterValue('GetServiceStatus request failed'),
    )
  })

  it('should throw a HttpError that can be handled', async () => {
    expect.assertions(7)

    const httpClient = httpClientThatThrows(getFixture('error-response'))

    let expectedError!: InvalidParameterValue

    try {
      await httpClient.request('POST', mockRequest)
    } catch (error) {
      expectedError = error
    }

    expect(expectedError instanceof MWSError).toStrictEqual(true)
    expect(expectedError instanceof HttpError).toStrictEqual(true)
    expect(expectedError instanceof InvalidParameterValue).toStrictEqual(true)
    expect(expectedError.code).toStrictEqual('InvalidParameterValue')
    expect(expectedError.type).toStrictEqual('Sender')
    expect(expectedError.requestId).toStrictEqual('e26147f9-30cc-4379-9fb5-bd4ad966c48b')
    expect(expectedError.mwsMessage).toStrictEqual(
      'CreatedAfter or LastUpdatedAfter must be specified',
    )
  })

  it('should propagate non-API errors', async () => {
    expect.assertions(1)

    const httpClient = httpClientThatThrows(new Error('Out of memory'))

    await expect(() => httpClient.request('POST', mockRequest)).rejects.toStrictEqual(
      new Error('Out of memory'),
    )
  })
})
