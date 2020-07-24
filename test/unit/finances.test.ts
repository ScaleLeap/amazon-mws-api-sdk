import { NextToken } from '../../src/parsing'
import {
  createMockHttpClient,
  mockMwsServiceStatus,
  mockParsingError,
  parsingErrorRegex,
} from '../utils'

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

describe('finances', () => {
  describe('listFinancialEventsByNextToken', () => {
    const mockNextToken = new NextToken('ListFinancialEvents', '123')

    it('returns a next token and financial events list if succesful', async () => {
      expect.assertions(1)

      const mockListFinancialEventNT = createMockHttpClient('finances_list_financial_events_nt')

      expect(
        await mockListFinancialEventNT.finances.listFinancialEventsByNextToken(mockNextToken),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response isn t valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockParsingError.finances.listFinancialEventsByNextToken(mockNextToken),
      ).rejects.toThrow(parsingErrorRegex)
    })
  })

  describe('listFinancialEvents', () => {
    const parameters = {
      PostedAfter: new Date(),
    }

    /**
     * Official mock response from C# library returns completely structured,
     * except enum properties return "String" instead of a possible enum value.
     * To test out the structure of the response, `enumeration` must be stubbed
     * to allow "String" as a possible value for all enums
     */
    it('succesfully decodes the full response of ListFinancialEvents', async () => {
      expect.assertions(1)

      const mockListFinancialEvents = createMockHttpClient(
        'finances_list_financial_events_structure',
      )

      expect(
        await mockListFinancialEvents.finances.listFinancialEvents(parameters),
      ).toMatchSnapshot()
    })

    it('returns a next token and financial events list if succesful', async () => {
      expect.assertions(1)

      const mockListFinancialEvents = createMockHttpClient('finances_list_financial_events')

      expect(
        await mockListFinancialEvents.finances.listFinancialEvents(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response isnt valid', async () => {
      expect.assertions(1)

      await expect(() => mockParsingError.finances.listFinancialEvents(parameters)).rejects.toThrow(
        parsingErrorRegex,
      )
    })
  })

  describe('listFinancialEventGroupsByNextToken', () => {
    const mockNextToken = new NextToken('ListFinancialEventGroups', '123')

    it('returns a next token and financial event groups list if succesful', async () => {
      expect.assertions(1)

      const mockListFinancialEventGroups = createMockHttpClient(
        'finances_list_financial_event_groups_nt',
      )

      expect(
        await mockListFinancialEventGroups.finances.listFinancialEventGroupsByNextToken(
          mockNextToken,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response isnt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockParsingError.finances.listFinancialEventGroupsByNextToken(mockNextToken),
      ).rejects.toThrow(parsingErrorRegex)
    })
  })

  describe('listFinancialEventGroups', () => {
    const parameters = {
      FinancialEventGroupStartedAfter: new Date(),
    }

    it('returns a next token and financial event groups list if succesful', async () => {
      expect.assertions(1)

      const mockListFinancialEventGroups = createMockHttpClient(
        'finances_list_financial_event_groups',
      )

      expect(
        await mockListFinancialEventGroups.finances.listFinancialEventGroups(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockParsingError.finances.listFinancialEventGroups(parameters),
      ).rejects.toThrow(parsingErrorRegex)
    })
  })

  describe('getServiceStatus', () => {
    it('returns a parsed model when the status response is valid', async () => {
      expect.assertions(1)
      expect(await mockMwsServiceStatus.finances.getServiceStatus()).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockParsingError.finances.getServiceStatus()).rejects.toThrow(
        parsingErrorRegex,
      )
    })
  })
})
