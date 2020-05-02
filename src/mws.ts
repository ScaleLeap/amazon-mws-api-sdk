/* eslint-disable no-underscore-dangle */
import { HttpClient, MWSOptions } from './http'
import { Sellers } from './sections/sellers'

export class MWS {
  private httpClient: HttpClient

  private _sellers!: Sellers

  constructor(private options: MWSOptions) {
    this.httpClient = options.httpClient ?? HttpClient.withDefaults()
  }

  get sellers() {
    if (!this._sellers) {
      this._sellers = new Sellers(this.options, this.httpClient)
    }

    return this._sellers
  }
}

/* eslint-enable no-underscore-dangle */
