// eslint-disable-next-line import/no-extraneous-dependencies
import { BaseConfig } from '@scaleleap/config'

export class Config extends BaseConfig {
  public readonly AWS_ACCESS_KEY_ID = this.get('AWS_ACCESS_KEY_ID').required().asString()

  public readonly MWS_AUTH_TOKEN = this.get('MWS_AUTH_TOKEN').required().asString()

  public readonly SECRET = this.get('SECRET').required().asString()

  public readonly SELLER_ID = this.get('SELLER_ID').required().asString()
}
