import { Codec, exactly } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { getServiceStatusByResource } from './shared'

const SUBSCRIPTIONS_API_VERSION = '2013-07-01'

export type DeliveryChannel = 'SQS'
export type AttributeKeyValueKeys = 'sqsQueueUrl'
interface AttributeKeyValue {
  Key: AttributeKeyValueKeys
  Value: string
}
interface Destination {
  DeliveryChannel: DeliveryChannel
  AttributeList: AttributeKeyValue[]
}

interface RegisterDestinationParameters {
  MarketplaceId: string
  Destination: Destination
}

const RegisterDestinationResponse = Codec.interface({
  RegisterDestinationResponse: Codec.interface({
    RegisterDestinationResult: exactly(''),
  }),
})

interface DeregisterDestinationParameters {
  MarketplaceId: string
  Destination: Destination
}

const DeregisterDestinationResponse = Codec.interface({
  DeregisterDestinationResponse: Codec.interface({
    DeregisterDestinationResult: exactly(''),
  }),
})

export class Subscriptions {
  constructor(private httpClient: HttpClient) {}

  async deregisterDestination(
    parameters: DeregisterDestinationParameters,
  ): Promise<['', RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Subscriptions,
      version: SUBSCRIPTIONS_API_VERSION,
      action: 'DeregisterDestination',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
        Destination: {
          DeliveryChannel: parameters.Destination.DeliveryChannel,
          'AttributeList.member': parameters.Destination.AttributeList,
        },
      },
    })

    return DeregisterDestinationResponse.decode(response).caseOf({
      Right: (x) => [x.DeregisterDestinationResponse.DeregisterDestinationResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async registerDestination(parameters: RegisterDestinationParameters): Promise<['', RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Subscriptions,
      version: SUBSCRIPTIONS_API_VERSION,
      action: 'RegisterDestination',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
        Destination: {
          DeliveryChannel: parameters.Destination.DeliveryChannel,
          'AttributeList.member': parameters.Destination.AttributeList,
        },
      },
    })

    return RegisterDestinationResponse.decode(response).caseOf({
      Right: (x) => [x.RegisterDestinationResponse.RegisterDestinationResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getServiceStatus() {
    return getServiceStatusByResource(
      this.httpClient,
      Resource.Subscriptions,
      SUBSCRIPTIONS_API_VERSION,
    )
  }
}
