import { boolean, Codec, date, exactly, GetInterface, number, oneOf, string } from 'purify-ts/Codec'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { ensureArray, nextToken } from '../parsing'
import { getServiceStatusByResource } from './shared'

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
  CreatedAfter?: string
  CreatedBefore?: string
  LastUpdatedAfter?: string
  LastUpdatedBefore?: string
  OrderStatus?: (keyof typeof OrderStatus)[]
  MarketplaceId: string[]
  FulfillmentChannel?: (keyof typeof FulfillmentChannel)[]
  PaymentMethod?: (keyof typeof PaymentMethod)[]
  BuyerEmail?: string
  SellerOrderId?: string
  MaxResultsPerPage?: number
  EasyShipShipmentStatus?: (keyof typeof EasyShipShipmentStatus)[]
}

const orderStatus: Codec<OrderStatus> = oneOf(Object.values(OrderStatus).map((x) => exactly(x)))
const fulfillmentChannel: Codec<FulfillmentChannel> = oneOf(
  Object.values(FulfillmentChannel).map((x) => exactly(x)),
)

const ListOrders = Codec.interface({
  NextToken: nextToken('ListOrders'),
  LastUpdatedBefore: string,
  Orders: Codec.interface({
    Order: ensureArray(
      Codec.interface({
        AmazonOrderId: string,
        PurchaseDate: date,
        LastUpdateDate: date,
        OrderStatus: orderStatus,
        FulfillmentChannel: fulfillmentChannel,
        SalesChannel: string,
        ShippingAddress: Codec.interface({
          Name: string,
          AddressLine1: string,
          City: string,
          PostalCode: string,
          CountryCode: string,
          AddressType: string,
        }),
        OrderTotal: Codec.interface({
          CurrencyCode: string,
          Amount: number,
        }),
        NumberOfItemsShipped: number,
        NumberOfItemsUnshipped: number,
        PaymentMethod: string,
        PaymentMethodDetails: Codec.interface({
          PaymentMethodDetail: ensureArray(string),
        }),
        MarketplaceId: string,
        BuyerEmail: string,
        BuyerTaxInfo: Codec.interface({
          CompanyLegalName: string,
          TaxingRegion: string,
          TaxClassifications: Codec.interface({
            TaxClassification: ensureArray(
              Codec.interface({
                Name: string,
                Value: string,
              }),
            ),
          }),
        }),
        OrderType: string,
        EarliestShipDate: date,
        LatestShipDate: date,
        IsBusinessOrder: boolean,
        PurchaseOrderNumber: string,
        IsPrime: boolean,
        IsPremiumOrder: boolean,
        IsGlobalExpressEnabled: boolean,
      }),
    ),
  }),
})

const ListOrdersResponse = Codec.interface({
  ListOrdersResponse: Codec.interface({
    ListOrdersResult: ListOrders,
  }),
})

type ListOrders = GetInterface<typeof ListOrders>

export class Orders {
  constructor(private httpClient: HttpClient) {}

  async listOrders(parameters: ListOrderParameters): Promise<[ListOrders, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Orders,
      version: ORDERS_API_VERSION,
      action: 'ListOrders',
      parameters: {
        CreatedAfter: parameters.CreatedAfter,
        CreatedBefore: parameters.CreatedBefore,
        LastUpdatedAfter: parameters.LastUpdatedAfter,
        LastUpdatedBefore: parameters.LastUpdatedBefore,
        'OrderStatus.Status': parameters.OrderStatus,
        'MarketplaceId.Id': parameters.MarketplaceId,
        'FulfillmentChannel.Channel': parameters.FulfillmentChannel,
        'PaymentMethod.Method': parameters.PaymentMethod,
        'EasyShipShipmentStatus.Status': parameters.EasyShipShipmentStatus,
        BuyerEmail: parameters.BuyerEmail,
        SellerOrderId: parameters.SellerOrderId,
        MaxResultsPerPage: parameters.MaxResultsPerPage,
      },
    })

    return ListOrdersResponse.decode(response).caseOf({
      Right: (x) => [x.ListOrdersResponse.ListOrdersResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getServiceStatus() {
    return getServiceStatusByResource(this.httpClient, Resource.Orders, ORDERS_API_VERSION)
  }
}
