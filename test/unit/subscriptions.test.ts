import { amazonMarketplaces, HttpClient, ParsingError } from '../../src'
import { MWS } from '../../src/mws'
import {
  AttributeKeyValueKeys,
  DeliveryChannel,
  NotificationType,
} from '../../src/sections/subscriptions'
import { getFixture } from '../utils'

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

const mockMwsServiceStatus = createMockHttpClient('get_service_status')

const mockMwsFail = new MWS(
  new HttpClient(httpConfig, () => Promise.resolve({ data: '', headers: {} })),
)

const parsingError = 'Expected an object, but received a string with value ""'

const mockDestination = {
  DeliveryChannel: 'SQS' as DeliveryChannel,
  AttributeList: [
    {
      Key: 'sqsQueueUrl' as AttributeKeyValueKeys,
      Value: 'https%3A%2F%2Fsqs.us-east-1.amazonaws.com%2F51471EXAMPLE%2Fmws_notifications',
    },
  ],
}

const mockMarketplaceIdDestinationParameters = {
  MarketplaceId: '',
  Destination: mockDestination,
}

const mockSubscription = {
  NotificationType: 'AnyOfferChanged' as NotificationType,
  Destination: mockDestination,
  IsEnabled: true,
}

const mockMarketplaceIdSubscriptionParameters = {
  MarketplaceId: '',
  Subscription: mockSubscription,
}

const mockSubscriptionActionParameters = {
  MarketplaceId: '',
  NotificationType: 'AnyOfferChanged' as NotificationType,
  Destination: mockDestination,
}

describe('sellers', () => {
  describe('updateSubscription', () => {
    const parameters = {
      MarketplaceId: '',
      Subscription: mockSubscription,
    }

    it('returns the standard response if update is succesful', async () => {
      expect.assertions(1)

      const mockUpdateSubscription = createMockHttpClient('subscriptions_update_subscription')

      expect(
        await mockUpdateSubscription.subscriptions.updateSubscription(parameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response isn t valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.subscriptions.updateSubscription(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('deleteSubscription', () => {
    it('returns the standard response if delete is succesful', async () => {
      expect.assertions(1)

      const mockDeleteSubscription = createMockHttpClient('subscriptions_delete_subscription')

      expect(
        await mockDeleteSubscription.subscriptions.deleteSubscription(
          mockSubscriptionActionParameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response isn t valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.subscriptions.deleteSubscription(mockSubscriptionActionParameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getSubscription', () => {
    it('returns a subscription if succesful', async () => {
      expect.assertions(1)

      const mockGetSubscription = createMockHttpClient('subscriptions_get_subscription')

      expect(
        await mockGetSubscription.subscriptions.getSubscription(mockSubscriptionActionParameters),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response isnt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.subscriptions.getSubscription(mockSubscriptionActionParameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('createSubscription', () => {
    it('returns the standard response if creation is succesful', async () => {
      expect.assertions(1)

      const mockCreateSubscription = createMockHttpClient('subscriptions_create_subscription')

      expect(
        await mockCreateSubscription.subscriptions.createSubscription(
          mockMarketplaceIdSubscriptionParameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response isnt valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.subscriptions.createSubscription(mockMarketplaceIdSubscriptionParameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('sendTestNotificationToDestination', () => {
    it('returns the standard response if testing is succesful', async () => {
      expect.assertions(1)

      const mockListRegisteredDestinations = createMockHttpClient(
        'subscriptions_send_test_notification_to_destination',
      )

      expect(
        await mockListRegisteredDestinations.subscriptions.sendTestNotificationToDestination(
          mockMarketplaceIdDestinationParameters,
        ),
      ).toMatchSnapshot()
    })

    it("throws a parsing error when the response isn't valid", async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.subscriptions.sendTestNotificationToDestination(
          mockMarketplaceIdDestinationParameters,
        ),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('listRegisteredDestinations', () => {
    const parameters = {
      MarketplaceId: '',
    }

    it('returns a list of destinations if succesful', async () => {
      expect.assertions(1)

      const mockListRegisteredDestinations = createMockHttpClient(
        'subscriptions_list_registered_destinations',
      )

      expect(
        await mockListRegisteredDestinations.subscriptions.listRegisteredDestinations(parameters),
      ).toMatchSnapshot()
    })

    it("throws a parsing error when the response isn't valid", async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.subscriptions.listRegisteredDestinations(parameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('deregisterDestination', () => {
    it('returns the standard response if deregistration is succesful', async () => {
      expect.assertions(1)

      const mockDeregisterDestination = createMockHttpClient('subscriptions_deregister_destination')

      expect(
        await mockDeregisterDestination.subscriptions.deregisterDestination(
          mockMarketplaceIdDestinationParameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.subscriptions.deregisterDestination(mockMarketplaceIdDestinationParameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('registerDestination', () => {
    it('returns the standard response if registration is succesful', async () => {
      expect.assertions(1)

      const mockRegisterDestination = createMockHttpClient('subscriptions_register_destination')

      expect(
        await mockRegisterDestination.subscriptions.registerDestination(
          mockMarketplaceIdDestinationParameters,
        ),
      ).toMatchSnapshot()
    })

    it('throws a parsing error when the response is not valid', async () => {
      expect.assertions(1)

      await expect(() =>
        mockMwsFail.subscriptions.registerDestination(mockMarketplaceIdDestinationParameters),
      ).rejects.toStrictEqual(new ParsingError(parsingError))
    })
  })

  describe('getServiceStatus', () => {
    it('returns a parsed model when the status response is valid', async () => {
      expect.assertions(1)

      expect(await mockMwsServiceStatus.subscriptions.getServiceStatus()).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockMwsFail.sellers.getServiceStatus()).rejects.toStrictEqual(
        new ParsingError(parsingError),
      )
    })
  })
})
