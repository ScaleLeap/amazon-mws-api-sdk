import { NextToken } from '../../src/parsing'
import {
  createMockHttpClient,
  mockMwsServiceStatus,
  mockParsingError,
  parsingErrorRegex,
} from '../utils'

describe('fulfillment-inventory', () => {
  describe('listInventorySupply', () => {
    const parameters = {
      SellerSkus: [''],
    }

    it('returns a parsed model when the response is valid', async () => {
      expect.assertions(1)

      const mockMwsInventorySupply = createMockHttpClient(
        'fulfillment_inventory_list_inventory_supply',
      )

      expect(
        await mockMwsInventorySupply.fulfillmentInventory.listInventorySupply(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockParsingError.fulfillmentInventory.listInventorySupply(parameters),
      ).rejects.toThrow(parsingErrorRegex)
    })
  })

  describe('listInventorySupplyByNextToken', () => {
    const mockNextTokenInventorySupply = new NextToken('ListInventorySupply', '123')

    it('returns a parsed model when the response is valid', async () => {
      expect.assertions(1)

      const mockMwsInventorySupplyNT = createMockHttpClient(
        'fulfillment_inventory_list_inventory_supply_nt',
      )

      expect(
        await mockMwsInventorySupplyNT.fulfillmentInventory.listInventorySupplyByNextToken(
          mockNextTokenInventorySupply,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockParsingError.fulfillmentInventory.listInventorySupplyByNextToken(
          mockNextTokenInventorySupply,
        ),
      ).rejects.toThrow(parsingErrorRegex)
    })
  })

  describe('getServiceStatus', () => {
    it('returns a parsed model when the status response is valid', async () => {
      expect.assertions(1)

      expect(await mockMwsServiceStatus.fulfillmentInventory.getServiceStatus()).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockParsingError.fulfillmentInventory.getServiceStatus()).rejects.toThrow(
        parsingErrorRegex,
      )
    })
  })
})
