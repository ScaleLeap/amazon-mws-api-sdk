import { Codec, number, optional, string } from 'purify-ts'

/**
 * Shared codecs
 */

// This is different from the CurrencyAmount used by merchant-fulfillment
export const CurrencyAmount = Codec.interface({
  CurrencyCode: optional(string),
  CurrencyAmount: optional(number),
})
