import { amazonMarketplaces, HttpClient, InvalidParameterValue } from '../../src'
import { Resource } from '../../src/http'
import { getFixture } from '../utils'

describe('httpClient', () => {
  it('should throw a HttpError on failure', async () => {
    expect.assertions(1)

    const httpClient = new HttpClient(
      {
        awsAccessKeyId: '',
        marketplace: amazonMarketplaces.CA,
        mwsAuthToken: '',
        secretKey: '',
        sellerId: '',
      },
      () => {
        throw getFixture('error-response')
      },
    )

    await expect(() =>
      httpClient.request('POST', {
        resource: Resource.Sellers,
        version: '',
        action: 'GetServiceStatus',
        parameters: {},
      }),
    ).rejects.toStrictEqual(new InvalidParameterValue('GetServiceStatus request failed'))
  })
})
