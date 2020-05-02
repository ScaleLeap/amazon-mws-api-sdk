/* eslint-disable no-underscore-dangle */
import { HttpClient } from './http'
import { Sellers } from './sections/sellers'

export class MWS {
  private _sellers!: Sellers

  // eslint-disable-next-line no-empty-function
  constructor(private httpClient: HttpClient) {}

  get sellers() {
    if (!this._sellers) {
      this._sellers = new Sellers(this.httpClient)
    }

    return this._sellers
  }
}

/* eslint-enable no-underscore-dangle */
