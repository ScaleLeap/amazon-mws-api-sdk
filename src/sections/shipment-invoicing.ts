import crypto from 'crypto'
import { Codec, enumeration, exactly, GetType, number, optional, string, unknown } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { ensureArray, ensureString, SKU } from '../parsing'
import { getServiceStatusByResource } from './shared'

const SHIPMENT_INVOICING_API_VERSION = '2018-09-01'

export interface GetFbaOutboundShipmentDetailParameters {
  MarketplaceId: string
  AmazonShipmentId: string
}

export enum AddressTypeEnum {
  Commercial = 'Commercial',
  Residential = 'Residential',
}

const AddressType = enumeration(AddressTypeEnum)

/**
 * Documentation has this as different from
 * MerchantFulfillment's address
 */
export const ShipmentInvoicingAddress = Codec.interface({
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
  ASIN: ensureString,
  SellerSKU: optional(SKU),
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
  ShippingAddress: optional(ShipmentInvoicingAddress),
  PaymentMethodDetails: ensureArray('PaymentMethodDetail', string),
  MarketplaceId: string,
  BuyerName: optional(string),
  BuyerCountry: optional(string),
  // Documentation type it as just a string, but the sample response is an object,
  // Unfortunately Amazon official docs don't have the definition for this
  BuyerTaxInfo: optional(unknown),
  ShipmentItems: ensureArray('ShipmentItem', ShipmentItem),
  WarehouseId: optional(string),
})

export const GetFBAOutboundShipmentDetail = Codec.interface({
  ShipmentDetail,
})

const GetFBAOutboundShipmentDetailResponse = Codec.interface({
  GetFBAOutboundShipmentDetailResponse: Codec.interface({
    GetFBAOutboundShipmentDetailResult: GetFBAOutboundShipmentDetail,
  }),
})

export interface SubmitFBAOutboundShipmentInvoiceParameters {
  MarketplaceId: string
  AmazonShipmentId: string
  InvoiceContent: string
}

export const SubmitFBAOutboundShipmentInvoiceResult = optional(exactly(''))

export type SubmitFBAOutboundShipmentInvoiceResult = GetType<
  typeof SubmitFBAOutboundShipmentInvoiceResult
>

const SubmitFBAOutboundShipmentInvoiceResponse = Codec.interface({
  SubmitFBAOutboundShipmentInvoiceResponse: Codec.interface({
    SubmitFBAOutboundShipmentInvoiceResult,
  }),
})
export interface GetFBAOutboundShipmentInvoiceStatusParameters {
  MarketplaceId: string
  AmazonShipmentId: string
}
export type GetFBAOutboundShipmentDetail = GetType<typeof GetFBAOutboundShipmentDetail>

const Shipment = Codec.interface({
  AmazonShipmentId: string,
  InvoiceStatus: string,
})

export const GetFBAOutboundShipmentInvoiceStatus = Codec.interface({
  Shipments: ensureArray('Shipment', Shipment),
})

export type GetFBAOutboundShipmentInvoiceStatus = GetType<
  typeof GetFBAOutboundShipmentInvoiceStatus
>

const GetFBAOutboundShipmentInvoiceStatusResponse = Codec.interface({
  GetFBAOutboundShipmentInvoiceStatusResponse: Codec.interface({
    GetFBAOutboundShipmentInvoiceStatusResult: GetFBAOutboundShipmentInvoiceStatus,
  }),
})

export class ShipmentInvoicing {
  constructor(private httpClient: HttpClient) {}

  async getFbaOutboundShipmentInvoiceStatus(
    parameters: GetFBAOutboundShipmentInvoiceStatusParameters,
  ): Promise<[GetFBAOutboundShipmentInvoiceStatus, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.ShipmentInvoicing,
      version: SHIPMENT_INVOICING_API_VERSION,
      action: 'GetFBAOutboundShipmentInvoiceStatus',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
        AmazonShipmentId: parameters.AmazonShipmentId,
      },
    })

    return GetFBAOutboundShipmentInvoiceStatusResponse.decode(response).caseOf({
      Right: (x) => [
        x.GetFBAOutboundShipmentInvoiceStatusResponse.GetFBAOutboundShipmentInvoiceStatusResult,
        meta,
      ],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async submitFbaOutboundShipmentInvoice(
    parameters: SubmitFBAOutboundShipmentInvoiceParameters,
  ): Promise<[SubmitFBAOutboundShipmentInvoiceResult, RequestMeta]> {
    const hash = crypto.createHash('md5').update(parameters.InvoiceContent).digest('base64')
    const [response, meta] = await this.httpClient.request(
      'POST',
      {
        resource: Resource.ShipmentInvoicing,
        version: SHIPMENT_INVOICING_API_VERSION,
        action: 'SubmitFBAOutboundShipmentInvoice',
        parameters: {
          MarketplaceId: parameters.MarketplaceId,
          AmazonShipmentId: parameters.AmazonShipmentId,
          ContentMD5Value: hash,
        },
      },
      parameters.InvoiceContent,
    )

    return SubmitFBAOutboundShipmentInvoiceResponse.decode(response).caseOf({
      Right: (x) => [
        x.SubmitFBAOutboundShipmentInvoiceResponse.SubmitFBAOutboundShipmentInvoiceResult,
        meta,
      ],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getFbaOutboundShipmentDetail(
    parameters: GetFbaOutboundShipmentDetailParameters,
  ): Promise<[GetFBAOutboundShipmentDetail, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.ShipmentInvoicing,
      version: SHIPMENT_INVOICING_API_VERSION,
      action: 'GetFBAOutboundShipmentDetail',
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
