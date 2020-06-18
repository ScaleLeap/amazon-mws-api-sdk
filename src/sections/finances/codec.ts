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
 * Previously had a huge enum of all available fee types but Amazon's
 * sample request contains <FeeType>ShippingChargeback</FeeType> which was not available
 * in their docs. I'm not sure what other FeeType could be missing from their docs
 */
const FeeType = string

const FeeComponent = Codec.interface({
  FeeType: optional(FeeType),
  FeeAmount: optional(CurrencyAmount),
})

enum ChargeTypeEnum {
  Principal = 'Principal',
  Tax = 'Tax',
  'MarketplaceFacilitatorTax-Principal' = 'MarketplaceFacilitatorTax-Principal',
  'MarketplaceFacilitatorTax-Shipping' = 'MarketplaceFacilitatorTax-Shipping',
  'MarketplaceFacilitatorTax-Giftwrap' = 'MarketplaceFacilitatorTax-Giftwrap',
  'MarketplaceFacilitatorTax-Other' = 'MarketplaceFacilitatorTax-Other',
  Discount = 'Discount',
  TaxDiscount = 'TaxDiscount',
  CODItemCharge = 'CODItemCharge',
  CODItemTaxCharge = 'CODItemTaxCharge',
  CODOrderCharge = 'CODOrderCharge',
  CODOrderTaxCharge = 'CODOrderTaxCharge',
  CODShippingCharge = 'CODShippingCharge',
  CODShippingTaxCharge = 'CODShippingTaxCharge',
  ShippingCharge = 'ShippingCharge',
  ShippingTax = 'ShippingTax',
  Goodwill = 'Goodwill',
  Giftwrap = 'Giftwrap',
  GiftwrapTax = 'GiftwrapTax',
  RestockingFee = 'RestockingFee',
  ReturnShipping = 'ReturnShipping',
  PointsFee = 'PointsFee',
  GenericDeduction = 'GenericDeduction',
  FreeReplacementReturnShipping = 'FreeReplacementReturnShipping',
  PaymentMethodFee = 'PaymentMethodFee',
  ExportCharge = 'ExportCharge',
  'SAFE-TReimbursement' = 'SAFE-TReimbursement',
  'TCS-CGST' = 'TCS-CGST',
  'TCS-SGST' = 'TCS-SGST',
  'TCS-IGST' = 'TCS-IGST',
  'TCS-UTGST' = 'TCS-UTGST',
}

const ChargeType = enumeration(ChargeTypeEnum)

const ChargeComponent = Codec.interface({
  ChargeType: optional(ChargeType),
  ChargeAmount: optional(CurrencyAmount),
})

enum DirectPaymentTypeEnum {
  StoredValueCardRevenue = 'StoredValueCardRevenue',
  StoredValueCardRefund = 'StoredValueCardRefund',
  PrivateLabelCreditCardRevenue = 'PrivateLabelCreditCardRevenue',
  PrivateLabelCreditCardRefund = 'PrivateLabelCreditCardRefund',
  CollectOnDeliveryRevenue = 'CollectOnDeliveryRevenue',
  CollectOnDeliveryRefund = 'CollectOnDeliveryRefund',
}

const DirectPaymentType = enumeration(DirectPaymentTypeEnum)

const DirectPayment = Codec.interface({
  DirectPaymentType: optional(DirectPaymentType),
  DirectPaymentAmount: optional(CurrencyAmount),
})

enum TaxCollectionModelEnum {
  MarketplaceFacilitator = 'MarketplaceFacilitator',
  Standard = 'Standard',
}

const TaxCollectionModel = enumeration(TaxCollectionModelEnum)

const TaxWithheldComponent = Codec.interface({
  TaxCollectionModel: optional(TaxCollectionModel),
  TaxesWithheld: optional(ensureArray('ChargeComponent', ChargeComponent)),
})

const Promotion = Codec.interface({
  PromotionType: optional(string),
  PromotionId: optional(string),
  PromotionAmount: optional(CurrencyAmount),
})

const ShipmentItem = Codec.interface({
  SellerSKU: optional(string),
  OrderItemId: optional(ensureString),
  OrderAdjustmentItemId: optional(ensureString),
  QuantityShipped: optional(number),
  ItemChargeList: optional(ensureArray('ChargeComponent', ChargeComponent)),
  ItemTaxWithheldList: optional(ensureArray('TaxWithheldComponent', TaxWithheldComponent)),
  ItemChargeAdjustmentList: optional(ensureArray('ChargeComponent', ChargeComponent)),
  ItemFeeList: optional(ensureArray('FeeComponent', FeeComponent)),
  ItemFeeAdjustmentList: optional(ensureArray('FeeComponent', FeeComponent)),
  PromotionList: optional(ensureArray('Promotion', Promotion)),
  PromotionAdjustmentList: optional(ensureArray('Promotion', Promotion)),
  CostOfPointsGranted: optional(CurrencyAmount),
  CostOfPointsReturned: optional(CurrencyAmount),
})

const ShipmentEvent = Codec.interface({
  AmazonOrderId: optional(string),
  SellerOrderId: optional(string),
  MarketplaceName: optional(string),
  OrderChargeList: optional(ensureArray('ChargeComponent', ChargeComponent)),
  OrderChargeAdjustmentList: optional(ensureArray('ChargeComponent', ChargeComponent)),
  ShipmentFeeList: optional(ensureArray('FeeComponent', FeeComponent)),
  ShipmentFeeAdjustmentList: optional(ensureArray('FeeComponent', FeeComponent)),
  OrderFeeList: optional(ensureArray('FeeComponent', FeeComponent)),
  OrderFeeAdjustmentList: optional(ensureArray('FeeComponent', FeeComponent)),
  DirectPaymentList: optional(ensureArray('DirectPayment', DirectPayment)),
  PostedDate: optional(mwsDate),
  ShipmentItemList: optional(ensureArray('ShipmentItem', ShipmentItem)),
  ShipmentItemAdjustmentList: optional(ensureArray('ShipmentItem', ShipmentItem)),
})
const RefundEvent = ShipmentEvent
const GuaranteeClaimEvent = ShipmentEvent
const ChargebackEvent = ShipmentEvent
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
