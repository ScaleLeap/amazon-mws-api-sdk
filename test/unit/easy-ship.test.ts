import { createMockHttpClient, mockMwsServiceStatus } from '../utils'

describe('easyShip', () => {
  describe('listPickupSlots', () => {
    const mockDimensions = {
      Length: 1,
      Width: 1,
      Height: 1,
      Unit: 'cm',
    }

    const mockWeight = {
      Value: 1,
      Unit: 'g',
    }
    const parameters = {
      MarketplaceId: '',
      AmazonOrderId: '',
      PackageDimensions: mockDimensions,
      PackageWeight: mockWeight,
    }

    it('returns list of pickup slots if succesful', async () => {
      expect.assertions(1)

      const mockListPickupSlots = createMockHttpClient('easy_ship_list_pickup_slots')

      expect(await mockListPickupSlots.easyShip.listPickupSlots(parameters)).toMatchSnapshot()
    })
  })

  describe('getServiceStatus', () => {
    it('returns a parsed model when the status response is valid', async () => {
      expect.assertions(1)

      expect(await mockMwsServiceStatus.easyShip.getServiceStatus()).toMatchSnapshot()
    })
  })
})
