import { Codec, enumeration, GetInterface, number, optional, string, unknown } from 'purify-ts'

import { ensureArray, ensureString, mwsDate, nextToken as nextTokenCodec } from '../../parsing'

enum ProcessingStatusEnum {
  Open = 'Open',
  Closed = 'Closed',
}

const ProcessingStatus = enumeration(ProcessingStatusEnum)

const CurrencyAmount = Codec.interface({
  CurrencyCode: optional(string),
  CurrencyAmount: optional(number),
})

const FinancialEventGroup = Codec.interface({
  FinancialEventGroupId: optional(string),
  ProcessingStatus: optional(ProcessingStatus),
  FundTransferStatus: optional(string),
  OriginalTotal: optional(CurrencyAmount),
  ConvertedTotal: optional(CurrencyAmount),
  FundTransferDate: optional(mwsDate),
  TraceId: optional(ensureString),
  AccountTail: optional(ensureString),
  BeginningBalance: optional(CurrencyAmount),
  FinancialEventGroupStart: optional(mwsDate),
  FinancialEventGroupEnd: optional(mwsDate),
})

const ListFinancialEventGroups = Codec.interface({
  NextToken: optional(nextTokenCodec('ListFinancialEventGroups')),
  FinancialEventGroupList: ensureArray('FinancialEventGroup', FinancialEventGroup),
})

export type ListFinancialEventGroups = GetInterface<typeof ListFinancialEventGroups>

export const ListFinancialEventGroupsResponse = Codec.interface({
  ListFinancialEventGroupsResponse: Codec.interface({
    ListFinancialEventGroupsResult: ListFinancialEventGroups,
  }),
})

export const ListFinancialEventGroupsByNextTokenResponse = Codec.interface({
  ListFinancialEventGroupsByNextTokenResponse: Codec.interface({
    ListFinancialEventGroupsByNextTokenResult: ListFinancialEventGroups,
  }),
})

/**
 * @todo
 */
const ShipmentEvent = unknown
/**
 * @todo
 */
const RefundEvent = unknown
/**
 * @todo
 */
const GuaranteeClaimEvent = unknown
/**
 * @todo
 */
const ChargebackEvent = unknown
/**
 * @todo
 */
const PayWithAmazonEvent = unknown
/**
 * @todo
 */
const ServiceProviderCreditEvent = unknown
/**
 * @todo
 */
const RetrochargeEvent = unknown
/**
 * @todo
 */
const RentalTransactionEvent = unknown
/**
 * @todo
 */
const PerformanceBondRefundEvent = unknown
/**
 * @todo
 */
const ProductAdsPaymentEvent = unknown
/**
 * @todo
 */
const ServiceFeeEvent = unknown
/**
 * @todo
 */
const DebtRecoveryEvent = unknown
/**
 * @todo
 */
const LoanServicingEvent = unknown
/**
 * @todo
 */
const AdjustmentEvent = unknown
/**
 * @todo
 */
const CouponPaymentEvent = unknown
/**
 * @todo
 */
const SAFETReimbursementEvent = unknown
/**
 * @todo
 */
const SellerReviewEnrollmentPaymentEvent = unknown
/**
 * @todo
 */
const FBALiquidationEvent = unknown
/**
 * @todo
 */
const ImagingServicesFeeEvent = unknown
/**
 * @todo
 */
const AffordabilityExpenseEvent = unknown
/**
 * @todo
 */
const AffordabilityExpenseReversalEvent = unknown
/**
 * @todo
 */
const NetworkComminglingTransactionEvent = unknown
/**
 * @todo
 */
const TDSReimbursementEvent = unknown

const FinancialEvents = Codec.interface({
  ShipmentEventList: optional(ensureArray('ShipmentEvent', ShipmentEvent)),
  RefundEventList: optional(ensureArray('RefundEvent', RefundEvent)),
  GuaranteeClaimEventList: optional(ensureArray('GuaranteeClaimEvent', GuaranteeClaimEvent)),
  ChargebackEventList: optional(ensureArray('ChargebackEvent', ChargebackEvent)),
  PayWithAmazonEventList: optional(ensureArray('PayWithAmazonEvent', PayWithAmazonEvent)),
  ServiceProviderCreditEventList: optional(
    ensureArray('ServiceProviderCreditEvent', ServiceProviderCreditEvent),
  ),
  RetrochargeEventList: optional(ensureArray('RetrochargeEvent', RetrochargeEvent)),
  RentalTransactionEventList: optional(
    ensureArray('RentalTransactionEvent', RentalTransactionEvent),
  ),
  PerformanceBondRefundEventList: optional(
    ensureArray('PerformanceBondRefundEvent', PerformanceBondRefundEvent),
  ),
  ProductAdsPaymentEventList: optional(
    ensureArray('ProductAdsPaymentEvent', ProductAdsPaymentEvent),
  ),
  ServiceFeeEventList: optional(ensureArray('ServiceFeeEvent', ServiceFeeEvent)),
  DebtRecoveryEventList: optional(ensureArray('DebtRecoveryEvent', DebtRecoveryEvent)),
  LoanServicingEventList: optional(ensureArray('LoanServicingEvent', LoanServicingEvent)),
  AdjustmentEventList: optional(ensureArray('AdjustmentEvent', AdjustmentEvent)),
  CouponPaymentEventList: optional(ensureArray('CouponPaymentEvent', CouponPaymentEvent)),
  SAFETReimbursementEventList: optional(
    ensureArray('SAFETReimbursementEvent', SAFETReimbursementEvent),
  ),
  SellerReviewEnrollmentPaymentEventList: optional(
    ensureArray('SellerReviewEnrollmentPaymentEvent', SellerReviewEnrollmentPaymentEvent),
  ),
  FBALiquidationEventList: optional(ensureArray('FBALiquidationEvent', FBALiquidationEvent)),
  ImagingServicesFeeEventList: optional(
    ensureArray('ImagingServicesFeeEvent', ImagingServicesFeeEvent),
  ),
  AffordabilityExpenseEventList: optional(
    ensureArray('AffordabilityExpenseEvent', AffordabilityExpenseEvent),
  ),
  AffordabilityExpenseReversalEventList: optional(
    ensureArray('AffordabilityExpenseReversalEvent', AffordabilityExpenseReversalEvent),
  ),
  NetworkComminglingTransactionEventList: optional(
    ensureArray('NetworkComminglingTransactionEvent', NetworkComminglingTransactionEvent),
  ),
  TDSReimbursementEventList: optional(ensureArray('TDSReimbursementEvent', TDSReimbursementEvent)),
})

const ListFinancialEvents = Codec.interface({
  NextToken: optional(nextTokenCodec('ListFinancialEvents')),
  FinancialEvents,
})

export type ListFinancialEvents = GetInterface<typeof ListFinancialEvents>

export const ListFinancialEventsResponse = Codec.interface({
  ListFinancialEventsResponse: Codec.interface({
    ListFinancialEventsResult: ListFinancialEvents,
  }),
})
