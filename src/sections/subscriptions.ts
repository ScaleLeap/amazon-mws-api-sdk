import { boolean, Codec, enumeration, exactly, GetType, string } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { ensureArray } from '../parsing'
import { getServiceStatusByResource } from './shared'

const SUBSCRIPTIONS_API_VERSION = '2013-07-01'

/**
 * Amazon docs list these as the only possible choices for each parameters
 */
export type DeliveryChannel = 'SQS'
export type AttributeKeyValueKeys = 'sqsQueueUrl'
export type NotificationType =
  | 'AnyOfferChanged'
  | 'FeedProcessingFinished'
  | 'FeePromotion'
  | 'FulfillmentOrderStatus'
  | 'ReportProcessingFinished'

export interface Destination {
  DeliveryChannel: DeliveryChannel
  AttributeList: AttributeKeyValue[]
}

export interface AttributeKeyValue {
  Key: AttributeKeyValueKeys
  Value: string
}

export interface Subscription {
  NotificationType: NotificationType
  Destination: Destination
  IsEnabled: boolean
}

export interface SubscriptionActionParameters {
  MarketplaceId: string
  NotificationType: NotificationType
  Destination: Destination
}

export type DeleteSubscriptionParameters = SubscriptionActionParameters
export interface MarketplaceIdAndDestinationOnlyParameters {
  MarketplaceId: string
  Destination: Destination
}

export type RegisterDestinationParameters = MarketplaceIdAndDestinationOnlyParameters
export type DeregisterDestinationParameters = MarketplaceIdAndDestinationOnlyParameters
export interface ListRegisteredDestinationsParameters {
  MarketplaceId: string
}
export interface UpdateSubscriptionParameters {
  MarketplaceId: string
  Subscription: Subscription
}
export type GetSubscriptionParameters = SubscriptionActionParameters

export enum NotificationTypeEnum {
  AnyOfferChanged = 'AnyOfferChanged',
  FeedProcessingFinished = 'FeedProcessingFinished',
  FeePromotion = 'FeePromotion',
  FulfillmentOrderStatus = 'FulfillmentOrderStatus',
  ReportProcessingFinished = 'ReportProcessingFinished',
}

const NotificationType = enumeration(NotificationTypeEnum)

const RegisterDestinationResponse = Codec.interface({
  RegisterDestinationResponse: Codec.interface({
    RegisterDestinationResult: exactly(''),
  }),
})

const DeregisterDestinationResponse = Codec.interface({
  DeregisterDestinationResponse: Codec.interface({
    DeregisterDestinationResult: exactly(''),
  }),
})

export enum AttribueKeyValueKeysEnum {
  sqsQueueUrl = 'sqsQueueUrl',
}
const AttribueKeyValueKeys = enumeration(AttribueKeyValueKeysEnum)

const AttribueKeyValue = Codec.interface({
  Value: string,
  Key: AttribueKeyValueKeys,
})

export enum DeliveryChannelEnum {
  SQS = 'SQS',
}

const DeliveryChannel = enumeration(DeliveryChannelEnum)

const Destination = Codec.interface({
  DeliveryChannel,
  AttributeList: ensureArray('member', AttribueKeyValue),
})

export const ListRegisteredDestinations = Codec.interface({
  DestinationList: ensureArray('member', Destination),
})

const ListRegisteredDestinationsResponse = Codec.interface({
  ListRegisteredDestinationsResponse: Codec.interface({
    ListRegisteredDestinationsResult: ListRegisteredDestinations,
  }),
})

export type SendTestNotificationToDestinationParameters = MarketplaceIdAndDestinationOnlyParameters

const SendTestNotificationToDestinationResponse = Codec.interface({
  SendTestNotificationToDestinationResponse: Codec.interface({
    SendTestNotificationToDestinationResult: exactly(''),
  }),
})

export interface CreateSubscriptionParameters {
  MarketplaceId: string
  Subscription: Subscription
}

const CreateSubscriptionResponse = Codec.interface({
  CreateSubscriptionResponse: Codec.interface({
    CreateSubscriptionResult: exactly(''),
  }),
})

export const Subscription = Codec.interface({
  NotificationType,
  Destination,
  IsEnabled: boolean,
})

export const GetSubscription = Codec.interface({
  Subscription,
})

const GetSubscriptionResponse = Codec.interface({
  GetSubscriptionResponse: Codec.interface({
    GetSubscriptionResult: GetSubscription,
  }),
})

const DeleteSubscriptionResponse = Codec.interface({
  DeleteSubscriptionResponse: Codec.interface({
    DeleteSubscriptionResult: exactly(''),
  }),
})

const UpdateSubscriptionResponse = Codec.interface({
  UpdateSubscriptionResponse: Codec.interface({
    UpdateSubscriptionResult: exactly(''),
  }),
})

export type ListRegisteredDestinations = GetType<typeof ListRegisteredDestinations>
export type GetSubscription = GetType<typeof GetSubscription>
export class Subscriptions {
  constructor(private httpClient: HttpClient) {}

  async updateSubscription(parameters: UpdateSubscriptionParameters): Promise<['', RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Subscriptions,
      version: SUBSCRIPTIONS_API_VERSION,
      action: 'UpdateSubscription',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
        Subscription: {
          NotificationType: parameters.Subscription.NotificationType,
          Destination: {
            DeliveryChannel: parameters.Subscription.Destination.DeliveryChannel,
            'AttributeList.member': parameters.Subscription.Destination.AttributeList,
          },
          IsEnabled: parameters.Subscription.IsEnabled,
        },
      },
    })

    return UpdateSubscriptionResponse.decode(response).caseOf({
      Right: (x) => [x.UpdateSubscriptionResponse.UpdateSubscriptionResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async deleteSubscription(parameters: DeleteSubscriptionParameters): Promise<['', RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Subscriptions,
      version: SUBSCRIPTIONS_API_VERSION,
      action: 'DeleteSubscription',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
        NotificationType: parameters.NotificationType,
        Destination: {
          DeliveryChannel: parameters.Destination.DeliveryChannel,
          'AttributeList.member': parameters.Destination.AttributeList,
        },
      },
    })

    return DeleteSubscriptionResponse.decode(response).caseOf({
      Right: (x) => [x.DeleteSubscriptionResponse.DeleteSubscriptionResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getSubscription(
    parameters: GetSubscriptionParameters,
  ): Promise<[GetSubscription, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Subscriptions,
      version: SUBSCRIPTIONS_API_VERSION,
      action: 'GetSubscription',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
        NotificationType: parameters.NotificationType,
        Destination: {
          DeliveryChannel: parameters.Destination.DeliveryChannel,
          'AttributeList.member': parameters.Destination.AttributeList,
        },
      },
    })

    return GetSubscriptionResponse.decode(response).caseOf({
      Right: (x) => [x.GetSubscriptionResponse.GetSubscriptionResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async createSubscription(parameters: CreateSubscriptionParameters): Promise<['', RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Subscriptions,
      version: SUBSCRIPTIONS_API_VERSION,
      action: 'CreateSubscription',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
        Subscription: {
          NotificationType: parameters.Subscription.NotificationType,
          Destination: {
            DeliveryChannel: parameters.Subscription.Destination.DeliveryChannel,
            'AttributeList.member': parameters.Subscription.Destination.AttributeList,
          },
          IsEnabled: parameters.Subscription.IsEnabled,
        },
      },
    })

    return CreateSubscriptionResponse.decode(response).caseOf({
      Right: (x) => [x.CreateSubscriptionResponse.CreateSubscriptionResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async sendTestNotificationToDestination(
    parameters: SendTestNotificationToDestinationParameters,
  ): Promise<['', RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Subscriptions,
      version: SUBSCRIPTIONS_API_VERSION,
      action: 'SendTestNotificationToDestination',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
        Destination: {
          DeliveryChannel: parameters.Destination.DeliveryChannel,
          'AttributeList.member': parameters.Destination.AttributeList,
        },
      },
    })

    return SendTestNotificationToDestinationResponse.decode(response).caseOf({
      Right: (x) => [
        x.SendTestNotificationToDestinationResponse.SendTestNotificationToDestinationResult,
        meta,
      ],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async listRegisteredDestinations(
    parameters: ListRegisteredDestinationsParameters,
  ): Promise<[ListRegisteredDestinations, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Subscriptions,
      version: SUBSCRIPTIONS_API_VERSION,
      action: 'ListRegisteredDestinations',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
      },
    })

    return ListRegisteredDestinationsResponse.decode(response).caseOf({
      Right: (x) => [x.ListRegisteredDestinationsResponse.ListRegisteredDestinationsResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

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
