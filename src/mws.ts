import { HttpClient } from './http'
import { FulfillmentInventory } from './sections/fulfillment-inventory'
import { Orders } from './sections/orders'
import { Products } from './sections/products/products'
import { Reports } from './sections/reports'
import { Sellers } from './sections/sellers'

export class MWS {
  private _sellers!: Sellers

  private _orders!: Orders

  private _fulfillmentInventory!: FulfillmentInventory

  private _products!: Products

  private _reports!: Reports

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

  get fulfillmentInventory() {
    if (!this._fulfillmentInventory) {
      this._fulfillmentInventory = new FulfillmentInventory(this.httpClient)
    }

    return this._fulfillmentInventory
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
}
