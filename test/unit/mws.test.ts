/** This test includes sanity checks only, for integration tests check out the /test/integration folder */

import { amazonMarketplaces } from '@scaleleap/amazon-marketplaces'

import { HttpClient, MWS } from '../../src'
import { Sellers } from '../../src/sections/sellers'

jest.mock('../../src/sections/sellers')

describe(`${MWS.name}`, () => {
  it('instantiates the section subclasses only once', () => {
    expect.assertions(1)

    const mockMws = new MWS(
      new HttpClient({
        awsAccessKeyId: '',
        marketplace: amazonMarketplaces.CA,
        mwsAuthToken: '',
        secretKey: '',
        sellerId: '',
      }),
    )

    /* eslint-disable no-unused-expressions */
    mockMws.sellers
    mockMws.sellers
    /* eslint-enable no-unused-expressions */

    expect(Sellers).toHaveBeenCalledTimes(1)
  })
})
