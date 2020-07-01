import { Codec, number, optional, string } from 'purify-ts'

/**
 * Shared codecs
 */

export const CurrencyAmount = Codec.interface({
  CurrencyCode: optional(string),
  CurrencyAmount: optional(number),
})
