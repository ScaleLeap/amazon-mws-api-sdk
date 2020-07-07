import { ParsingError } from '../../src'
import { mockMwsFail, mockMwsServiceStatus, parsingError } from '../utils'

describe('recommendations', () => {
  describe('getServiceStatus', () => {
    it('returns a parsed model when the status response is valid', async () => {
      expect.assertions(1)

      expect(await mockMwsServiceStatus.recommendations.getServiceStatus()).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.recommendations.getServiceStatus()).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })
})
