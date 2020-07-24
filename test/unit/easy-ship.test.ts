import { createMockHttpClient, mockMwsServiceStatus } from '../utils'

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

describe('easyShip', () => {
  describe('createScheduledPackage', () => {
    const mockPickupSlot = {
      SlotId: '',
      PickupTimeStart: new Date(),
      PickupTimeEnd: new Date(),
    }
    const mockPackageRequestDetails = {
      PackagePickupSlot: mockPickupSlot,
    }
    const parameters = {
      AmazonOrderId: '',
      MarketplaceId: '',
      PackageRequestDetails: mockPackageRequestDetails,
    }

    it('returns information about the scheduled package if succesful', async () => {
      expect.assertions(1)

      const mockCreateSchedulePackage = createMockHttpClient('easy_ship_create_scheduled_package')

      expect(
        await mockCreateSchedulePackage.easyShip.createScheduledPackage(parameters),
      ).toMatchSnapshot()
    })
  })

  describe('listPickupSlots', () => {
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
