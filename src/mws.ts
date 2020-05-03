import { HttpClient } from './http'
import { Sellers } from './sections/sellers'

export class MWS {
  private _sellers!: Sellers

  constructor(private httpClient: HttpClient) {}

  get sellers() {
    if (!this._sellers) {
      this._sellers = new Sellers(this.httpClient)
    }

    return this._sellers
  }
}
