import { amazonMarketplaces, HttpClient, ParsingError } from '../../src'
import { MWS } from '../../src/mws'
// import { NextToken } from '../../src/parsing'
import { getFixture } from '../utils'

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
const mockMwsInventorySupply = new MWS(
  new HttpClient(httpConfig, () =>
    Promise.resolve({
      data: getFixture('fulfillment_inventory_list_inventory_supply'),
      headers,
    }),
  ),
)

const mockMwsFail = new MWS(
  new HttpClient(httpConfig, () => Promise.resolve({ data: '', headers: {} })),
)

// const mockNextToken = new NextToken('ListOrdersBy', '123')

const parsingError = 'Expected an object, but received a string with value ""'

describe('fulfillment-inventory', () => {
  describe('listInventorySupply', () => {
    it('returns a parsed model when the response is valid', async () => {
      expect.assertions(1)
      expect(
        await mockMwsInventorySupply.fulfillmentInventory.listInventorySupply({}),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.sellers.listMarketplaceParticipations()).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })
})
