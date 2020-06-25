/**
 * For use with parameters that require one of two values
 * Source: https://stackoverflow.com/a/49725198/5808843
 */

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys]

export enum FulfillmentChannelEnum {
  AFN = 'AFN',
  MFN = 'MFN',
}
