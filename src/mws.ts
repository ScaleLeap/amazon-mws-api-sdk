import { HttpClient } from './http'
import { Orders } from './sections/orders'
import { Sellers } from './sections/sellers'

export class MWS {
  private _sellers!: Sellers

  private _orders!: Orders

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
}
