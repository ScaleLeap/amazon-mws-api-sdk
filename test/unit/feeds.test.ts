import { ParsingError } from '../../src'
import { createMockHttpClient, mockMwsFail, parsingError } from '../utils'

describe('feeds', () => {
  describe('getFeedSubmissionList', () => {
    it('returns a next token and feed submission info if succesful', async () => {
      expect.assertions(1)

      const mockGetFeedSubmissionList = createMockHttpClient('feeds_get_feed_submission_list')

      expect(await mockGetFeedSubmissionList.feeds.getFeedSubmissionList()).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.feeds.getFeedSubmissionList()()).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })
})
