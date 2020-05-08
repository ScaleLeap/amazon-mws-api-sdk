import { date } from 'purify-ts'

import { BadParameterError } from '../error'
import { HttpClient, Resource } from '../http'

const ORDERS_API_VERSION = '2013-09-01'

export enum OrderStatus {
  PendingAvailability = 'PendingAvailability',
  Pending = 'Pending',
  Unshipped = 'Unshipped',
  PartiallyShipped = 'PartiallyShipped',
  Shipped = 'Shipped',
  Canceled = 'Canceled',
  Unfulfillable = 'Unfulfillable',
}

export enum FulfillmentChannel {
  AFN = 'AFN',
  MFN = 'MFN',
}

export enum PaymentMethod {
  COD = 'COD',
  CVS = 'CVS',
  Other = 'Other',
}

export enum EasyShipShipmentStatus {
  PendingPickUp = 'PendingPickUp',
  LabelCanceled = 'LabelCanceled',
  PickedUp = 'PickedUp',
  OutForDelivery = 'OutForDelivery',
  Damaged = 'Damaged',
  Delivered = 'Delivered',
  RejectedByBuyer = 'RejectedByBuyer',
  Undeliverable = 'Undeliverable',
  ReturnedToSeller = 'ReturnedToSeller',
  ReturningToSller = 'ReturningToSller',
  Lost = 'Lost',
}

interface ListOrderParameters {
  createdAfter?: string
  createdBefore?: string
  lastUpdatedAfter?: string
  lastUpdatedBefore?: string
  orderStatuses?: OrderStatus[]
  marketplaceIds: string[]
  fulfillmentChannels?: FulfillmentChannel[]
  paymentMethods?: PaymentMethod[]
  buyerEmail?: string
  sellerOrderId?: string
  maxResultsPerPage?: number
  easyShipShipmentStatuses?: EasyShipShipmentStatus[]
}

const validateCreatedAfter = (parameters: ListOrderParameters): void => {
  if (!parameters.createdAfter && !parameters.lastUpdatedAfter) {
    throw new BadParameterError(
      'Parameter "createdAfter" is required if "lastUpdatedAfter" is not specified.',
    )
  }

  if (parameters.createdAfter && parameters.lastUpdatedAfter) {
    throw new BadParameterError(
      'Specifying both "createdAfter" and "lastUpdatedAfter" is not allowed.',
    )
  }

  if (parameters.createdAfter && date.decode(parameters.createdAfter).isLeft()) {
    throw new BadParameterError('"createdAfter" must be in ISO 8601 date time format.')
  }
}

const validateCreatedBefore = (parameters: ListOrderParameters): void => {
  if (parameters.createdBefore && date.decode(parameters.createdBefore).isLeft()) {
    throw new BadParameterError('"createdBefore" must be in ISO 8601 date time format.')
  }
}

const validateLastUpdatedAfter = (parameters: ListOrderParameters): void => {
  if (!parameters.lastUpdatedAfter && !parameters.createdAfter) {
    throw new BadParameterError(
      'Parameter "lastUpdatedAfter" is required if "createdAfter" is not specified.',
    )
  }

  if (parameters.lastUpdatedAfter && (parameters.buyerEmail || parameters.sellerOrderId)) {
    throw new BadParameterError(
      'If "lastUpdatedAfter" is specified, then "buyerEmail" and "sellerOrderId" cannot be specified.',
    )
  }

  if (parameters.lastUpdatedAfter && date.decode(parameters.lastUpdatedAfter).isLeft()) {
    throw new BadParameterError('"lastUpdatedAfter" must be in ISO 8601 date time format.')
  }
}

const validateLastUpdatedBefore = (parameters: ListOrderParameters): void => {
  if (parameters.lastUpdatedBefore && date.decode(parameters.lastUpdatedBefore).isLeft()) {
    throw new BadParameterError('"lastUpdatedBefore" must be in ISO 8601 date time format.')
  }
}

const validateBuyerEmail = (parameters: ListOrderParameters): void => {
  if (
    parameters.buyerEmail &&
    (parameters.fulfillmentChannels ||
      parameters.orderStatuses ||
      parameters.paymentMethods ||
      parameters.lastUpdatedAfter ||
      parameters.lastUpdatedBefore ||
      parameters.sellerOrderId)
  ) {
    throw new BadParameterError(
      'If "buyerEmail" is specified, then "fulfillmentChannels", "orderStatuses", "paymentMethods", "lastUpdatedAfter", "lastUpdatedBefore", and "sellerOrderId" cannot be specified.',
    )
  }
}

const validateSellerOrderId = (parameters: ListOrderParameters): void => {
  if (
    parameters.sellerOrderId &&
    (parameters.fulfillmentChannels ||
      parameters.orderStatuses ||
      parameters.paymentMethods ||
      parameters.lastUpdatedAfter ||
      parameters.lastUpdatedBefore ||
      parameters.buyerEmail)
  ) {
    throw new BadParameterError(
      'If "sellerOrderId" is specified, then "fulfillmentChannels", "orderStatuses", "paymentMethods", "lastUpdatedAfter", "lastUpdatedBefore", and "buyerEmail" cannot be specified.',
    )
  }
}

const validateOrderStatuses = (parameters: ListOrderParameters): void => {
  if (parameters.orderStatuses) {
    let foundUnshipped = false
    let foundPartiallyShipped = false

    for (let i = 0; i < parameters.orderStatuses.length; i += 1) {
      if (parameters.orderStatuses[i] === OrderStatus.Unshipped) {
        foundUnshipped = true
      }

      if (parameters.orderStatuses[i] === OrderStatus.PartiallyShipped) {
        foundPartiallyShipped = true
      }
    }

    if ((foundUnshipped && !foundPartiallyShipped) || (foundPartiallyShipped && !foundUnshipped)) {
      throw new BadParameterError(
        '"orderStatuses": Unshipped and PartiallyShipped must be used together. Using one and not the other is not valid.',
      )
    }
  }
}

const validateMarketplaceIds = (parameters: ListOrderParameters): void => {
  if (parameters.marketplaceIds && parameters.marketplaceIds.length > 50) {
    throw new BadParameterError('"marketplaceIds": A maximum of 50 ids is allowed.')
  }
}

const validateMaxResultsPerPage = (parameters: ListOrderParameters): void => {
  if (
    parameters.maxResultsPerPage !== undefined &&
    (parameters.maxResultsPerPage < 1 || parameters.maxResultsPerPage > 100)
  ) {
    throw new BadParameterError('"maxResultsPerPage": Value must be 1 - 100.')
  }
}

export class Orders {
  constructor(private httpClient: HttpClient) {}

  async listOrders(parameters: ListOrderParameters) {
    validateCreatedAfter(parameters)
    validateCreatedBefore(parameters)
    validateLastUpdatedAfter(parameters)
    validateLastUpdatedBefore(parameters)
    validateOrderStatuses(parameters)
    validateMarketplaceIds(parameters)
    validateBuyerEmail(parameters)
    validateSellerOrderId(parameters)
    validateMaxResultsPerPage(parameters)

    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Orders,
      version: ORDERS_API_VERSION,
      action: 'ListOrders',
      parameters: {
        CreatedAfter: parameters.createdAfter,
        CreatedBefore: parameters.createdBefore,
        LastUpdatedAfter: parameters.lastUpdatedAfter,
        LastUpdatedBefore: parameters.lastUpdatedBefore,
        'OrderStatus.Status': parameters.orderStatuses,
        'MarketplaceId.Id': parameters.marketplaceIds,
        'FulfillmentChannel.Channel': parameters.fulfillmentChannels,
        'PaymentMethod.Method': parameters.paymentMethods,
        'EasyShipShipmentStatus.Status': parameters.easyShipShipmentStatuses,
        BuyerEmail: parameters.buyerEmail,
        SellerOrderId: parameters.sellerOrderId,
        MaxResultsPerPage: parameters.maxResultsPerPage,
      },
    })

    return [response, meta]
  }
}
