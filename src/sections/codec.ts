import { Codec, optional, string } from 'purify-ts'

import { ensureFloat } from '../parsing'

/**
 * Shared codecs
 */

// This is different from the CurrencyAmount used by merchant-fulfillment
export const CurrencyAmount = Codec.interface({
  CurrencyCode: optional(string),
  CurrencyAmount: optional(ensureFloat),
})
