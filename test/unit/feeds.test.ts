import { ParsingError } from '../../src'
import { NextToken } from '../../src/parsing'
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

      await expect(() => mockMwsFail.feeds.getFeedSubmissionList()).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })

  describe('getFeedSubmissionListByNextToken', () => {
    const nextToken = new NextToken('GetFeedSubmissionList', '123')

    it('returns a next token and feed submission info if succesful', async () => {
      expect.assertions(1)

      const mockGetFeedSubmissionListNT = createMockHttpClient('feeds_get_feed_submission_list_nt')

      expect(
        await mockGetFeedSubmissionListNT.feeds.getFeedSubmissionListByNextToken(nextToken),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.feeds.getFeedSubmissionListByNextToken(nextToken),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })
})
