import {
  AttributeKeyValueKeys,
  DeliveryChannel,
  NotificationType,
} from '../../src/sections/subscriptions'
import {
  createMockHttpClient,
  mockMwsServiceStatus,
  mockParsingError,
  parsingErrorRegex,
} from '../utils'

describe('sellers', () => {
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
        mockParsingError.subscriptions.updateSubscription(parameters),
      ).rejects.toThrow(parsingErrorRegex)
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
        mockParsingError.subscriptions.deleteSubscription(mockSubscriptionActionParameters),
      ).rejects.toThrow(parsingErrorRegex)
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
        mockParsingError.subscriptions.getSubscription(mockSubscriptionActionParameters),
      ).rejects.toThrow(parsingErrorRegex)
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
        mockParsingError.subscriptions.createSubscription(mockMarketplaceIdSubscriptionParameters),
      ).rejects.toThrow(parsingErrorRegex)
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
        mockParsingError.subscriptions.sendTestNotificationToDestination(
          mockMarketplaceIdDestinationParameters,
        ),
      ).rejects.toThrow(parsingErrorRegex)
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
        mockParsingError.subscriptions.listRegisteredDestinations(parameters),
      ).rejects.toThrow(parsingErrorRegex)
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
        mockParsingError.subscriptions.deregisterDestination(
          mockMarketplaceIdDestinationParameters,
        ),
      ).rejects.toThrow(parsingErrorRegex)
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
        mockParsingError.subscriptions.registerDestination(mockMarketplaceIdDestinationParameters),
      ).rejects.toThrow(parsingErrorRegex)
    })
  })

  describe('getServiceStatus', () => {
    it('returns a parsed model when the status response is valid', async () => {
      expect.assertions(1)

      expect(await mockMwsServiceStatus.subscriptions.getServiceStatus()).toMatchSnapshot()
    })

    it('throws a parsing error when the status response is not valid', async () => {
      expect.assertions(1)

      await expect(() => mockParsingError.sellers.getServiceStatus()).rejects.toThrow(
        parsingErrorRegex,
      )
    })
  })
})
