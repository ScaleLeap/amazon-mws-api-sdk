import { amazonMarketplaces, HttpClient, ParsingError } from '../../src'
import { MWS } from '../../src/mws'
import { NextToken } from '../../src/parsing'
import { getFixture } from '../utils'

function mockFunctions() {
  /**
   * Mock everything in purify-ts, restore it except for `enumeration`
   * https://github.com/facebook/jest/issues/936#issuecomment-265074320
   */
  const original = require.requireActual('purify-ts')
  return {
    ...original, // Pass down all the exported objects
    enumeration: () => {
      return original.Codec.custom({
        decode: (input: string | number) => {
          return original.Right(input)
        },
        encode: original.identity,
      })
    },
  }
}
jest.mock('purify-ts', () => mockFunctions())

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

const createMockHttpClient = (fixture: string) =>
  new MWS(
    new HttpClient(httpConfig, () =>
      Promise.resolve({
        data: getFixture(fixture),
        headers,
      }),
    ),
  )

const mockMwsFail = new MWS(
  new HttpClient(httpConfig, () => Promise.resolve({ data: '', headers: {} })),
)

const parsingError = 'Expected an object, but received a string with value ""'

describe('finances', () => {
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

      jest.clearAllMocks()
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

      await expect(() =>
        mockMwsFail.finances.listFinancialEvents(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
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
        mockMwsFail.finances.listFinancialEventGroupsByNextToken(mockNextToken),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
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
        mockMwsFail.finances.listFinancialEventGroups(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getServiceStatus', () => {
    it('returns a parsed model when the status response is valid', async () => {
      expect.assertions(1)

      const mockMwsServiceStatus = createMockHttpClient('get_service_status')

      expect(await mockMwsServiceStatus.finances.getServiceStatus()).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.finances.getServiceStatus()).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })
})
