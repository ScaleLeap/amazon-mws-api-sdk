import { ParsingError, SubmitFeedParameters } from '../../src'
import { NextToken } from '../../src/parsing'
import { createMockHttpClient, mockMwsFail, parsingError } from '../utils'

describe('feeds', () => {
  describe('submitFeed', () => {
    const parameters: SubmitFeedParameters = {
      FeedContent: '',
      FeedType: '_POST_PRODUCT_DATA_',
    }

    it('returns feed info of submitted feeds if succesful', async () => {
      expect.assertions(1)

      const mockSubmitFeed = createMockHttpClient('feeds_submit_feed')

      expect(await mockSubmitFeed.feeds.submitFeed(parameters)).toMatchSnapshot()
    })

    it('throws a parsing error when the response isnt valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.feeds.submitFeed(parameters)).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })

  describe('getFeedSubmissionResult', () => {
    const parameters = { FeedSubmissionId: '' }

    it('returns an XML file when succesful', async () => {
      expect.assertions(1)

      const mockGetFeedSubmissionResult = createMockHttpClient('feeds_get_feed_submission_result')

      expect(
        await mockGetFeedSubmissionResult.feeds.getFeedSubmissionResult(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response isnt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.feeds.getFeedSubmissionResult(parameters),
      ).rejects.toStrictEqual(new ParsingError('Expected feed to have length of more than 0'))
    })
  })

  describe('cancelFeedSubmissions', () => {
    it('returns count and submission info of canceled feed submissions', async () => {
      expect.assertions(1)

      const mockCancelFeedSubmissions = createMockHttpClient('feeds_cancel_feed_submissions')

      expect(await mockCancelFeedSubmissions.feeds.cancelFeedSubmissions()).toMatchSnapshot()
    })

    it("throws a parsing error when the response isn't valid", async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.feeds.cancelFeedSubmissions()).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })

  describe('getFeedSubmissionList', () => {
    it('returns a next token and feed submission info if succesful', async () => {
      expect.assertions(1)

      const mockGetFeedSubmissionList = createMockHttpClient('feeds_get_feed_submission_list')

      expect(await mockGetFeedSubmissionList.feeds.getFeedSubmissionList()).toMatchSnapshot()
    })

    it("throws a parsing error when the response isn't valid", async () => {
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

  describe('getFeedSubmissionCount', () => {
    it('returns count of total number of feed submissions if succesful', async () => {
      expect.assertions(1)

      const mockGetFeedSubmissionCount = createMockHttpClient('feeds_get_feed_submission_count')

      expect(await mockGetFeedSubmissionCount.feeds.getFeedSubmissionCount()).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.feeds.getFeedSubmissionCount()).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })
})
