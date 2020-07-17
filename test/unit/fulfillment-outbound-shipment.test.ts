import { ParsingError } from '../../src'
import { mockMwsFail, mockMwsServiceStatus, parsingError } from '../utils'

describe('fulfillmentOutboundShipment', () => {
  describe('getServiceStatus', () => {
    it('returns a parsed model when the status response is valid', async () => {
      expect.assertions(1)

      expect(
        await mockMwsServiceStatus.fulfillmentOutboundShipment.getServiceStatus(),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.fulfillmentOutboundShipment.getServiceStatus(),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })
})
