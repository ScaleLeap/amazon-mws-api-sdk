import { amazonMarketplaces } from '@scaleleap/amazon-marketplaces'

import { Subscriptions } from '../../src'
import { Config } from './config'
import { itci } from './it'

const httpClient = new Config().createHttpClient()

/* eslint-disable jest/no-standalone-expect */
describe('subscriptions', () => {
  itci('should be able to query service status', async () => {
    expect.assertions(1)

    const subscriptions = new Subscriptions(httpClient)

    const [response] = await subscriptions.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })

  itci('should be able to create a subscription', async () => {
    expect.assertions(2)

    const subscriptions = new Subscriptions(httpClient)

    const [registerDestinationResponse] = await subscriptions.registerDestination({
      MarketplaceId: amazonMarketplaces.CA.id,
      Destination: {
        AttributeList: [
          {
            Key: 'sqsQueueUrl',
            Value: 'https://sqs.us-east-1.amazonaws.com/304786922662/mws-sub-testw',
          },
        ],
        DeliveryChannel: 'SQS',
      },
    })

    const [createSubscriptionResponse] = await subscriptions.createSubscription({
      MarketplaceId: amazonMarketplaces.CA.id,
      Subscription: {
        IsEnabled: true,
        Destination: {
          AttributeList: [
            {
              Key: 'sqsQueueUrl',
              Value: 'https://sqs.us-east-1.amazonaws.com/304786922662/mws-sub-testw',
            },
          ],
          DeliveryChannel: 'SQS',
        },
        NotificationType: 'AnyOfferChanged',
      },
    })

    expect(registerDestinationResponse).toBe('')
    expect(createSubscriptionResponse).toBe('')
  })
})
/* eslint-enable jest/no-standalone-expect */
