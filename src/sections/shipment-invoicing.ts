import { Codec, enumeration, GetInterface, number, optional, string, unknown } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { ensureArray, ensureString } from '../parsing'
import { getServiceStatusByResource } from './shared'

/**
 * The first API version is what's written in the docs directory name
 * but the second one is what's used in the request examples
 * Keeping both for now as reference, and encountered an issue in integrations
 * early on (something about incorrect address) that resolved itself for some reason
 */
const SHIPMENT_INVOICING_API_VERSION = '2018-11-01'
// const SHIPMENT_INVOICING_API_VERSION = '2018-09-01'

export interface GetFbaOutboundShipmentDetailParameters {
  MarketplaceId: string
  AmazonShipmentId: string
}

enum AddressTypeEnum {
  Commercial = 'Commercial',
  Residential = 'Residential',
}

const AddressType = enumeration(AddressTypeEnum)

/**
 * Documentation has this as different from
 * MerchantFulfillment's address
 */
export const Address = Codec.interface({
  Name: string,
  AddressLine1: optional(string),
  AddressLine2: optional(string),
  AddressLine3: optional(string),
  City: optional(string),
  County: optional(string),
  District: optional(string),
  StateOrRegion: optional(string),
  PostalCode: optional(ensureString),
  CountryCode: optional(string),
  Phone: optional(ensureString),
  AddressType: optional(AddressType),
})

export const Money = Codec.interface({
  CurrencyCode: optional(string),
  Amount: optional(ensureString),
})

const ShipmentItem = Codec.interface({
  ASIN: string,
  SellerSKU: optional(string),
  OrderItemId: ensureString,
  Title: optional(string),
  QuantityOrdered: number,
  ItemPrice: optional(Money),
  ShippingPrice: optional(Money),
  GiftWrapPrice: optional(Money),
  ShippingDiscount: optional(Money),
  PromotionDiscount: optional(Money),
  SerialNumbers: optional(ensureArray('SerialNumber', ensureString)),
})

const ShipmentDetail = Codec.interface({
  AmazonOrderId: string,
  AmazonShipmentId: string,
  PurchaseDate: string,
  ShippingAddress: optional(Address),
  PaymentMethodDetails: ensureArray('PaymentMethodDetail', string),
  MarketplaceId: string,
  BuyerName: optional(string),
  BuyerCountry: optional(string),
  // Documentation type it as just a string, but the sample response is an object,
  // Unfortunately Amazon official docs don't have module for `ShipmentInvoicing`
  BuyerTaxInfo: optional(unknown),
  ShipmentItems: ensureArray('ShipmentItem', ShipmentItem),
  WarehouseId: optional(string),
})

const GetFBAOutboundShipmentDetail = Codec.interface({
  ShipmentDetail,
})

const GetFBAOutboundShipmentDetailResponse = Codec.interface({
  GetFBAOutboundShipmentDetailResponse: Codec.interface({
    GetFBAOutboundShipmentDetailResult: GetFBAOutboundShipmentDetail,
  }),
})

export type GetFBAOutboundShipmentDetail = GetInterface<typeof GetFBAOutboundShipmentDetail>
export class ShipmentInvoicing {
  constructor(private httpClient: HttpClient) {}

  async getFbaOutboundShipmentDetail(
    parameters: GetFbaOutboundShipmentDetailParameters,
  ): Promise<[GetFBAOutboundShipmentDetail, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.Sellers,
      version: SHIPMENT_INVOICING_API_VERSION,
      action: 'ListMarketplaceParticipationsByNextToken',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
        AmazonShipmentId: parameters.AmazonShipmentId,
      },
    })

    return GetFBAOutboundShipmentDetailResponse.decode(response).caseOf({
      Right: (x) => [
        x.GetFBAOutboundShipmentDetailResponse.GetFBAOutboundShipmentDetailResult,
        meta,
      ],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getServiceStatus() {
    return getServiceStatusByResource(
      this.httpClient,
      Resource.ShipmentInvoicing,
      SHIPMENT_INVOICING_API_VERSION,
    )
  }
}
