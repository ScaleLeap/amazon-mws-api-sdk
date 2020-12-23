import { amazonMarketplacesList } from '@scaleleap/amazon-marketplaces'
import { BaseConfig } from '@scaleleap/config'

import { HttpClient } from '../../src'

export class Config extends BaseConfig {
  private readonly MARKETPLACE_COUNTRY_CODE = this.get('MARKETPLACE_COUNTRY_CODE')
    .default('CA')
    .asString()

  private readonly AWS_ACCESS_KEY_ID = this.get('AWS_ACCESS_KEY_ID').required().asString()

  private readonly MWS_AUTH_TOKEN = this.get('MWS_AUTH_TOKEN').required().asString()

  private readonly SECRET_KEY = this.get('SECRET_KEY').required().asString()

  private readonly SELLER_ID = this.get('SELLER_ID').required().asString()

  public createHttpClient(): HttpClient {
    const marketplace = amazonMarketplacesList.find(
      (m) => m.countryCode.toString() === this.MARKETPLACE_COUNTRY_CODE,
    )

    if (!marketplace) {
      throw new Error(
        `Cannot find marketplace with country code "${this.MARKETPLACE_COUNTRY_CODE}".`,
      )
    }

    return new HttpClient({
      marketplace,
      awsAccessKeyId: this.AWS_ACCESS_KEY_ID,
      mwsAuthToken: this.MWS_AUTH_TOKEN,
      secretKey: this.SECRET_KEY,
      sellerId: this.SELLER_ID,
    })
  }
}
