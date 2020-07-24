import { mockMwsServiceStatus } from '../utils'

describe('easyShip', () => {
  describe('getServiceStatus', () => {
    it('returns a parsed model when the status response is valid', async () => {
      expect.assertions(1)

      expect(await mockMwsServiceStatus.easyShip.getServiceStatus()).toMatchSnapshot()
    })
  })
})
