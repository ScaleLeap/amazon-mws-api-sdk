import {
  amazonMarketplaces,
  HttpClient,
  HttpError,
  InvalidAddress,
  InvalidParameterValue,
  InvalidUPCIdentifier,
  MWSError,
} from '../../src'
import { cleanParameters, Resource } from '../../src/http'
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

    const httpClient = httpClientThatThrows(getFixture('error_response'))

    await expect(() => httpClient.request('POST', mockRequest)).rejects.toStrictEqual(
      new InvalidParameterValue('GetServiceStatus request failed'),
    )
  })

  it('should throw a HttpError that can be handled', async () => {
    expect.assertions(7)

    const httpClient = httpClientThatThrows(getFixture('error_response'))

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

  it('should propagate API errors that are not valid', async () => {
    expect.assertions(1)

    const fixture = getFixture('invalid_error_response')
    const httpClient = httpClientThatThrows(fixture)

    await expect(() => httpClient.request('POST', mockRequest)).rejects.toStrictEqual(fixture)
  })

  it('should handle Invalid UPC identifier error', async () => {
    expect.assertions(1)

    const httpClient = new HttpClient(
      {
        awsAccessKeyId: '',
        marketplace: amazonMarketplaces.CA,
        mwsAuthToken: '',
        secretKey: '',
        sellerId: '',
      },
      () => Promise.resolve({ data: 'Invalid UPC identifier', headers: {} }),
    )

    const request = {
      resource: Resource.Products,
      version: '',
      action: 'GetMatchingProductForId',
      parameters: {},
    } as const

    await expect(() => httpClient.request('POST', request)).rejects.toStrictEqual(
      new InvalidUPCIdentifier('GetMatchingProductForId request failed'),
    )
  })

  describe('default fetch', () => {
    it('returns only the XML response on failure', async () => {
      expect.assertions(1)

      const httpClient = new HttpClient({
        awsAccessKeyId: 'a',
        marketplace: amazonMarketplaces.CA,
        mwsAuthToken: 'b',
        secretKey: 'c',
        sellerId: 'd',
      })

      await expect(() => httpClient.request('POST', mockRequest)).rejects.toStrictEqual(
        new InvalidAddress('GetServiceStatus request failed'),
      )
    })
  })

  describe('cleanParameters', () => {
    it('should properly clean primitive parameters', () => {
      expect.hasAssertions()

      const parameters = {
        abc: ['a', 'b', 'c'],
        a: 'a',
        b: 'b',
        c: true,
      }

      const expectedResult = { 'abc.1': 'a', 'abc.2': 'b', 'abc.3': 'c', a: 'a', b: 'b', c: 'true' }

      expect(cleanParameters(parameters)).toStrictEqual(expectedResult)
    })

    it('should properly clean parameters with array of objects', () => {
      expect.hasAssertions()

      const parameters = {
        'aabbc.ddcc': [
          {
            a: 'a',
          },
          {
            b: 'b',
          },
          {
            c: {
              d: 'd',
              c: 'c,',
            },
          },
        ],
      }

      const results = {
        'aabbc.ddcc.1.a': 'a',
        'aabbc.ddcc.2.b': 'b',
        'aabbc.ddcc.3.c.d': 'd',
        'aabbc.ddcc.3.c.c': 'c,',
      }

      expect(cleanParameters(parameters)).toStrictEqual(results)
    })

    it('should properly clean parameters with object arrays for attributes', () => {
      expect.hasAssertions()

      const parameters = {
        MarketplaceId: 'ATVPDKIKX0DER',
        Destination: {
          DeliveryChannel: 'SQS',
          'AttributeList.member': [
            {
              Key: 'sqsQueueUrl',
              Value: 'https%3A%2F%2Fsqs.us-east-1.amazonaws.com%2F51471EXAMPLE%2Fmws_notifications',
            },
          ],
        },
      }

      const results = {
        MarketplaceId: 'ATVPDKIKX0DER',
        'Destination.DeliveryChannel': 'SQS',
        'Destination.AttributeList.member.1.Key': 'sqsQueueUrl',
        'Destination.AttributeList.member.1.Value':
          'https%3A%2F%2Fsqs.us-east-1.amazonaws.com%2F51471EXAMPLE%2Fmws_notifications',
      }

      expect(cleanParameters(parameters)).toStrictEqual(results)
    })
  })
})
