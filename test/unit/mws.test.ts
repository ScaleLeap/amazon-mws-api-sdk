/** This test includes sanity checks only, for integration tests check out the /test/integration folder */

/* eslint-disable no-unused-expressions */
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
    expect.assertions(1)

    mockMws.sellers
    mockMws.sellers

    expect(Sellers).toHaveBeenCalledTimes(1)
  })

  it('instantiates the orders section only once', () => {
    expect.assertions(1)

    mockMws.orders
    mockMws.orders

    expect(Orders).toHaveBeenCalledTimes(1)
  })
})
/* eslint-enable no-unused-expressions */
