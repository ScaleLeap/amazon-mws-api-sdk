import { HttpClient } from './http'
import { Feeds } from './sections/feeds'
import { Finances } from './sections/finances/finances'
import { FulfillmentInboundShipment } from './sections/fulfillment-inbound-shipment/fulfillment-inbound-shipment'
import { FulfillmentInventory } from './sections/fulfillment-inventory'
import { MerchantFulfillment } from './sections/merchant-fulfillment/merchant-fulfillment'
import { Orders } from './sections/orders'
import { Products } from './sections/products/products'
import { Reports } from './sections/reports'
import { Sellers } from './sections/sellers'
import { ShipmentInvoicing } from './sections/shipment-invoicing'
import { Subscriptions } from './sections/subscriptions'

export class MWS {
  private _feeds!: Feeds

  private _finances!: Finances

  private _fulfillmentInventory!: FulfillmentInventory

  private _fulfillmentInboundShipment!: FulfillmentInboundShipment

  private _merchantFulfillment!: MerchantFulfillment

  private _orders!: Orders

  private _products!: Products

  private _reports!: Reports

  private _sellers!: Sellers

  private _subscriptions!: Subscriptions

  private _shipmentInvoicing!: ShipmentInvoicing

  constructor(private httpClient: HttpClient) {}

  get sellers() {
    if (!this._sellers) {
      this._sellers = new Sellers(this.httpClient)
    }

    return this._sellers
  }

  get orders() {
    if (!this._orders) {
      this._orders = new Orders(this.httpClient)
    }

    return this._orders
  }

  get feeds() {
    if (!this._feeds) {
      this._feeds = new Feeds(this.httpClient)
    }

    return this._feeds
  }

  get finances() {
    if (!this._finances) {
      this._finances = new Finances(this.httpClient)
    }

    return this._finances
  }

  get fulfillmentInboundShipment() {
    if (!this._fulfillmentInboundShipment) {
      this._fulfillmentInboundShipment = new FulfillmentInboundShipment(this.httpClient)
    }

    return this._fulfillmentInboundShipment
  }

  get fulfillmentInventory() {
    if (!this._fulfillmentInventory) {
      this._fulfillmentInventory = new FulfillmentInventory(this.httpClient)
    }

    return this._fulfillmentInventory
  }

  get merchantFulfillment() {
    if (!this._merchantFulfillment) {
      this._merchantFulfillment = new MerchantFulfillment(this.httpClient)
    }

    return this._merchantFulfillment
  }

  get products() {
    if (!this._products) {
      this._products = new Products(this.httpClient)
    }

    return this._products
  }

  get reports() {
    if (!this._reports) {
      this._reports = new Reports(this.httpClient)
    }

    return this._reports
  }

  get shipmentInvoicing() {
    if (!this._shipmentInvoicing) {
      this._shipmentInvoicing = new ShipmentInvoicing(this.httpClient)
    }

    return this._shipmentInvoicing
  }

  get subscriptions() {
    if (!this._subscriptions) {
      this._subscriptions = new Subscriptions(this.httpClient)
    }

    return this._subscriptions
  }
}
