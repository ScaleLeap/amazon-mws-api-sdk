import { amazonMarketplaces, HttpClient, HttpError } from '../../src'
import { Resource } from '../../src/http'

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
        throw new Error('404')
      },
    )

    await expect(() =>
      httpClient.request('POST', {
        resource: Resource.Sellers,
        version: '',
        action: 'GetServiceStatus',
        parameters: {},
      }),
    ).rejects.toStrictEqual(new HttpError(new Error('404')))
  })
})
