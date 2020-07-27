import { createMockHttpClient, mockMwsServiceStatus } from '../utils'

function mockEnum() {
  /**
   * Mock everything in purify-ts, restore it back to normal,
   *  except for `enumeration` which will be stubbed to accept
   * https://github.com/facebook/jest/issues/936#issuecomment-265074320
   */
  const original = jest.requireActual('purify-ts')

  return {
    ...original, // Pass down all the exported objects
    enumeration: <T extends Record<string, string | number>>(enumeration: T) => {
      const enumValues = Object.values(enumeration)

      return original.Codec.custom({
        decode: (input: string | number) => {
          if (typeof input !== 'string' && typeof input !== 'number') {
            return original.Left(`Expected enum, received ${input}`)
          }

          const enumIndex = enumValues.indexOf(input)

          return enumIndex !== -1 || input === 'String'
            ? original.Right((enumValues[enumIndex] as T[keyof T]) || 'String')
            : original.Left(`Expected enum, received ${input}`)
        },
        encode: original.identity,
        schema: () => ({ enum: enumValues }),
      })
    },
  }
}
jest.mock('purify-ts', () => mockEnum())

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

    it('returns information about the scheduled package if structure is correct', async () => {
      expect.assertions(1)

      const mockCreateSchedulePackage = createMockHttpClient(
        'easy_ship_create_scheduled_package_from_c_sharp',
      )

      expect(
        await mockCreateSchedulePackage.easyShip.createScheduledPackage(parameters),
      ).toMatchSnapshot()
    })

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
