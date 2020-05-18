/** This test includes sanity checks only, for integration tests check out the /test/integration folder */

import { amazonMarketplaces } from '@scaleleap/amazon-marketplaces'

import { HttpClient, MWS } from '../../src'
import { Orders } from '../../src/sections/orders'
import { Sellers } from '../../src/sections/sellers'

jest.mock('../../src/sections/sellers')
jest.mock('../../src/sections/orders')

const mockMws = new MWS(
  new HttpClient({
    awsAccessKeyId: '',
    marketplace: amazonMarketplaces.CA,
    mwsAuthToken: '',
    secretKey: '',
    sellerId: '',
  }),
)

describe(`${MWS.name}`, () => {
  it('instantiates the sellers section only once', () => {
    expect.assertions(3)

    expect(mockMws.sellers).toBeInstanceOf(Sellers)
    expect(mockMws.sellers).toBeInstanceOf(Sellers)
    expect(Sellers).toHaveBeenCalledTimes(1)
  })

  it('instantiates the orders section only once', () => {
    expect.assertions(3)

    expect(mockMws.orders).toBeInstanceOf(Orders)
    expect(mockMws.orders).toBeInstanceOf(Orders)
    expect(Orders).toHaveBeenCalledTimes(1)
  })
})
