import { amazonMarketplaces } from '@scaleleap/amazon-marketplaces'
import { BaseConfig } from '@scaleleap/config'

import { HttpClient } from '../../src'

export class Config extends BaseConfig {
  private readonly AWS_ACCESS_KEY_ID = this.get('AWS_ACCESS_KEY_ID').required().asString()

  private readonly MWS_AUTH_TOKEN = this.get('MWS_AUTH_TOKEN').required().asString()

  private readonly SECRET_KEY = this.get('SECRET_KEY').required().asString()

  private readonly SELLER_ID = this.get('SELLER_ID').required().asString()

  public createHttpClient() {
    return new HttpClient({
      marketplace: amazonMarketplaces.CA,
      awsAccessKeyId: this.AWS_ACCESS_KEY_ID,
      mwsAuthToken: this.MWS_AUTH_TOKEN,
      secretKey: this.SECRET_KEY,
      sellerId: this.SELLER_ID,
    })
  }
}
