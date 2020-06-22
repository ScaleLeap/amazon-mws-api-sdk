import { amazonMarketplaces } from '@scaleleap/amazon-marketplaces'

import { Subscriptions } from '../../src'
import { Config } from './config'
import { itci } from './it'

const SQS_URL = 'https://sqs.us-east-1.amazonaws.com/304786922662/mws-sub-testw'

const httpClient = new Config().createHttpClient()
const subscriptions = new Subscriptions(httpClient)

/* eslint-disable jest/no-standalone-expect */
describe('subscriptions', () => {
  itci('should be able to query service status', async () => {
    expect.assertions(1)

    const [response] = await subscriptions.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })

  itci('should be able to create a subscription', async () => {
    expect.assertions(2)

    const [registerDestinationResponse] = await subscriptions.registerDestination({
      MarketplaceId: amazonMarketplaces.CA.id,
      Destination: {
        AttributeList: [
          {
            Key: 'sqsQueueUrl',
            Value: SQS_URL,
          },
        ],
        DeliveryChannel: 'SQS',
      },
    })

    const [createSubscriptionResponse] = await subscriptions.createSubscription({
      MarketplaceId: amazonMarketplaces.CA.id,
      Subscription: {
        IsEnabled: true,
        NotificationType: 'AnyOfferChanged',
        Destination: {
          AttributeList: [
            {
              Key: 'sqsQueueUrl',
              Value: SQS_URL,
            },
          ],
          DeliveryChannel: 'SQS',
        },
      },
    })

    expect(registerDestinationResponse).toBe('')
    expect(createSubscriptionResponse).toBe('')
  })

  itci('should be able to delete a subscription', async () => {
    expect.assertions(2)

    const [deleteSubscriptionResponse] = await subscriptions.deleteSubscription({
      MarketplaceId: amazonMarketplaces.CA.id,
      NotificationType: 'AnyOfferChanged',
      Destination: {
        AttributeList: [
          {
            Key: 'sqsQueueUrl',
            Value: SQS_URL,
          },
        ],
        DeliveryChannel: 'SQS',
      },
    })

    const [deregisterDestinationResponse] = await subscriptions.deregisterDestination({
      MarketplaceId: amazonMarketplaces.CA.id,
      Destination: {
        AttributeList: [
          {
            Key: 'sqsQueueUrl',
            Value: SQS_URL,
          },
        ],
        DeliveryChannel: 'SQS',
      },
    })

    expect(deleteSubscriptionResponse).toBe('')
    expect(deregisterDestinationResponse).toBe('')
  })
})
/* eslint-enable jest/no-standalone-expect */
