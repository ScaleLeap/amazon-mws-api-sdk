import { Codec, enumeration, GetType, optional, string } from 'purify-ts'

import {
  ensureArray,
  ensureBool,
  ensureFloat,
  ensureInt,
  mwsDate,
  nextToken as nextTokenCodec,
} from '../../parsing'
import { DimensionsUnitEnum } from '../merchant-fulfillment/codec'
import {
  CreateInboundShipmentParameters,
  PackageStatusEnum,
  PrepInstructionEnum,
  PrepOwnerEnum,
  WeightUnitEnum,
} from './type'

export enum GuidanceReasonEnum {
  SlowMovingASIN = 'SlowMovingASIN',
  NoApplicableGuidance = 'NoApplicableGuidance',
}

export enum InboundGuidanceEnum {
  InboundNotRecommended = 'InboundNotRecommended',
  InboundOK = 'InboundOK',
}

export const GuidanceReason = enumeration(GuidanceReasonEnum)
export const InboundGuidance = enumeration(InboundGuidanceEnum)

export const SKUInboundGuidance = Codec.interface({
  SellerSKU: string,
  ASIN: string,
  InboundGuidance,
  GuidanceReasonList: optional(ensureArray('GuidanceReason', GuidanceReason)),
})

export const InvalidSKU = Codec.interface({
  SellerSKU: string,
  ErrorReason: string,
})

export const GetInboundGuidanceForSKU = Codec.interface({
  SKUInboundGuidanceList: ensureArray('SKUInboundGuidance', SKUInboundGuidance),
  InvalidSKUList: optional(ensureArray('InvalidSKU', InvalidSKU)),
})

export type GetInboundGuidanceForSKU = GetType<typeof GetInboundGuidanceForSKU>

export const GetInboundGuidanceForSKUResponse = Codec.interface({
  GetInboundGuidanceForSKUResponse: Codec.interface({
    GetInboundGuidanceForSKUResult: GetInboundGuidanceForSKU,
  }),
})

export const InvalidASIN = Codec.interface({
  ASIN: string,
  ErrorReason: string,
})

export const ASINInboundGuidance = Codec.interface({
  ASIN: string,
  InboundGuidance,
  GuidanceReasonList: optional(ensureArray('GuidanceReason', GuidanceReason)),
})

export const GetInboundGuidanceForASIN = Codec.interface({
  ASINInboundGuidanceList: ensureArray('ASINInboundGuidance', ASINInboundGuidance),
  InvalidASINList: ensureArray('InvalidASIN', InvalidASIN),
})

export type GetInboundGuidanceForASIN = GetType<typeof GetInboundGuidanceForASIN>

export const GetInboundGuidanceForASINResponse = Codec.interface({
  GetInboundGuidanceForASINResponse: Codec.interface({
    GetInboundGuidanceForASINResult: GetInboundGuidanceForASIN,
  }),
})

export const CreateInboundShipment = Codec.interface({
  ShipmentId: string,
})

export type CreateInboundShipment = GetType<typeof CreateInboundShipment>

export const CreateInboundShipmentResponse = Codec.interface({
  CreateInboundShipmentResponse: Codec.interface({
    CreateInboundShipmentResult: CreateInboundShipment,
  }),
})

export type UpdateInboundShipmentParameters = CreateInboundShipmentParameters

export const UpdateInboundShipment = Codec.interface({
  ShipmentId: string,
})

export type UpdateInboundShipment = GetType<typeof UpdateInboundShipment>

export const UpdateInboundShipmentResponse = Codec.interface({
  UpdateInboundShipmentResponse: Codec.interface({
    UpdateInboundShipmentResult: UpdateInboundShipment,
  }),
})

export const FISAddress = Codec.interface({
  Name: string,
  AddressLine1: string,
  AddressLine2: optional(string),
  City: string,
  DistrictOrCounty: optional(string),
  StateOrProvinceCode: optional(string),
  CountryCode: string,
  PostalCode: optional(string),
})

const PrepDetails = Codec.interface({
  PrepInstruction: enumeration(PrepInstructionEnum),
  PrepOwner: enumeration(PrepOwnerEnum),
})

export const InboundShipmentPlanItem = Codec.interface({
  SellerSKU: string,
  FulfillmentNetworkSKU: string,
  Quantity: ensureInt,
  PrepDetailsList: optional(ensureArray('PrepDetails', PrepDetails)),
})

export const Amount = Codec.interface({
  CurrencyCode: string,
  Value: string,
})

export const BoxContentsFeeDetails = Codec.interface({
  TotalUnits: optional(ensureInt),
  FeePerUnit: optional(Amount),
  TotalFee: optional(Amount),
})

export const InboundShipmentPlan = Codec.interface({
  ShipmentId: string,
  DestinationFulfillmentCenterId: string,
  ShipToAddress: FISAddress,
  LabelPrepType: string,
  Items: ensureArray('member', InboundShipmentPlanItem),
  EstimatedBoxContentsFee: optional(BoxContentsFeeDetails),
})

export const CreateInboundShipmentPlan = Codec.interface({
  InboundShipmentPlans: ensureArray('member', InboundShipmentPlan),
})

export type CreateInboundShipmentPlan = GetType<typeof CreateInboundShipmentPlan>

export const CreateInboundShipmentPlanResponse = Codec.interface({
  CreateInboundShipmentPlanResponse: Codec.interface({
    CreateInboundShipmentPlanResult: CreateInboundShipmentPlan,
  }),
})

export const GetPreorderInfo = Codec.interface({
  ShipmentContainsPreorderableItems: ensureBool,
  NeedByDate: string,
  ConfirmedFulfillableDate: string,
  ShipmentConfirmedForPreorder: ensureBool,
})

export type GetPreorderInfo = GetType<typeof GetPreorderInfo>

export const GetPreorderInfoResponse = Codec.interface({
  GetPreorderInfoResponse: Codec.interface({
    GetPreorderInfoResult: GetPreorderInfo,
  }),
})

export const ConfirmPreorder = Codec.interface({
  ConfirmedNeedByDate: string,
  ConfirmedFulfillableDate: string,
})

export type ConfirmPreorder = GetType<typeof ConfirmPreorder>

export const ConfirmPreorderResponse = Codec.interface({
  ConfirmPreorderResponse: Codec.interface({
    ConfirmPreorderResult: ConfirmPreorder,
  }),
})

export enum BarcodeInstructionEnum {
  RequiresFNSKULabel = 'RequiresFNSKULabel',
  CanUseOriginalBarcode = 'CanUserOriginalBarcode',
}

export const BarcodeInstruction = enumeration(BarcodeInstructionEnum)

export enum PrepGuidanceEnum {
  ConsultHelpDocuments = 'ConsultHelpDocuments',
  NoAdditionalPrepRequired = 'NoAdditionalPrepRequired',
  SeePrepInstructionsList = 'SeePrepInstructionsList',
}

export const PrepGuidance = enumeration(PrepGuidanceEnum)

const PrepInstruction = enumeration(PrepInstructionEnum)

export const AmazonPrepFeesDetails = Codec.interface({
  PrepInstruction,
  FeePerUnit: Amount,
})

export const SKUPrepInstructions = Codec.interface({
  SellerSKU: string,
  ASIN: string,
  BarcodeInstruction,
  PrepGuidance,
  PrepInstructionList: ensureArray('PrepInstruction', PrepInstruction),
  AmazonPrepFeesDetailsList: ensureArray('AmazonPrepFeesDetails', AmazonPrepFeesDetails),
})

export const GetPrepInstructionsForSKU = Codec.interface({
  SKUPrepInstructionsList: ensureArray('SKUPrepInstructions', SKUPrepInstructions),
  InvalidSKUList: ensureArray('InvalidSKU', InvalidSKU),
})

export type GetPrepInstructionsForSKU = GetType<typeof GetPrepInstructionsForSKU>

export const GetPrepInstructionsForSKUResponse = Codec.interface({
  GetPrepInstructionsForSKUResponse: Codec.interface({
    GetPrepInstructionsForSKUResult: GetPrepInstructionsForSKU,
  }),
})

export const ASINPrepInstructions = Codec.interface({
  ASIN: string,
  BarcodeInstruction,
  PrepGuidance,
  PrepInstructionList: ensureArray('PrepInstruction', PrepInstruction),
})

export const GetPrepInstructionsForASIN = Codec.interface({
  ASINPrepInstructionsList: ensureArray('ASINPrepInstructions', ASINPrepInstructions),
  InvalidASINList: ensureArray('InvalidASIN', InvalidASIN),
})

export type GetPrepInstructionsForASIN = GetType<typeof GetPrepInstructionsForASIN>

export const GetPrepInstructionsForASINResponse = Codec.interface({
  GetPrepInstructionsForASINResponse: Codec.interface({
    GetPrepInstructionsForASINResult: GetPrepInstructionsForASIN,
  }),
})

export enum TransportStatusEnum {
  WORKING = 'WORKING',
  ERROR_ON_ESTIMATING = 'ERROR_ON_ESTIMATING',
  ESTIMATING = 'ESTIMATING',
  ESTIMATED = 'ESTIMATED',
  ERROR_ON_CONFIRMING = 'ERROR_ON_CONFIRMING',
  CONFIRMING = 'CONFIRMING',
  CONFIRMED = 'CONFIRMED',
  VOIDING = 'VOIDING',
  VOIDED = 'VOIDED',
  ERROR_IN_VOIDING = 'ERROR_IN_VOIDING',
}

export const TransportStatus = enumeration(TransportStatusEnum)

export const PutTransportContent = Codec.interface({
  TransportResult: Codec.interface({
    TransportStatus,
  }),
})

export type PutTransportContent = GetType<typeof PutTransportContent>

export const PutTransportContentResponse = Codec.interface({
  PutTransportContentResponse: Codec.interface({
    PutTransportContentResult: PutTransportContent,
  }),
})

export const EstimateTransportRequest = Codec.interface({
  TransportResult: Codec.interface({
    TransportStatus,
  }),
})

export type EstimateTransportRequest = GetType<typeof EstimateTransportRequest>

export const EstimateTransportRequestResponse = Codec.interface({
  EstimateTransportRequestResponse: Codec.interface({
    EstimateTransportRequestResult: EstimateTransportRequest,
  }),
})

export const TransportHeader = Codec.interface({
  SellerId: string,
  ShipmentId: string,
  IsPartnered: ensureBool,
  ShipmentType: string,
})

export const PartneredEstimate = Codec.interface({
  Amount: optional(Amount),
  ConfirmDeadline: optional(mwsDate),
  VoidDeadline: optional(mwsDate),
})

export const PackageStatus = enumeration(PackageStatusEnum)

const DimensionsUnit = enumeration(DimensionsUnitEnum)

const FIBDimensions = Codec.interface({
  Unit: DimensionsUnit,
  Length: ensureFloat,
  Width: ensureFloat,
  Height: ensureFloat,
})

const WeightUnit = enumeration(WeightUnitEnum)

const FIBWeight = Codec.interface({
  Unit: WeightUnit,
  Value: ensureFloat,
})

export const PartneredSmallParcelPackageOutput = Codec.interface({
  Dimensions: FIBDimensions,
  Weight: FIBWeight,
  TrackingId: string,
  PackageStatus,
  CarrierName: string,
})

const NonPartneredSmallParcelPackageOutput = Codec.interface({
  CarrierName: string,
  TrackingId: string,
  PackageStatus,
})

export const NonPartneredSmallParcelDataOutput = Codec.interface({
  PackageList: ensureArray('member', NonPartneredSmallParcelPackageOutput),
})

export const PartneredSmallParcelDataOutput = Codec.interface({
  PackageList: ensureArray('member', PartneredSmallParcelPackageOutput),
  PartneredEstimate: optional(PartneredEstimate),
})

const Contact = Codec.interface({
  Name: string,
  Phone: string,
  Email: string,
  Fax: string,
})

const Pallet = Codec.interface({
  Dimensions: FIBDimensions,
  Weight: optional(FIBWeight),
  IsStacked: ensureBool,
})

export const PartneredLtlDataOutput = Codec.interface({
  Contact,
  BoxCount: ensureInt,
  SellerFreightClass: optional(string),
  FreightReadyDate: string,
  PalletList: ensureArray('member', Pallet),
  SellerDeclaredValue: optional(Amount),
  AmazonCalculatedValue: optional(Amount),
  PreviewPickupDate: mwsDate,
  PreviewDeliveryDate: mwsDate,
  PreviewFreightClass: string,
  AmazonReferenceId: string,
  IsBillOfLadingAvailable: ensureBool,
  PartneredEstimate: optional(PartneredEstimate),
  CarrierName: string,
})

export const NonPartneredLtlDataOutput = Codec.interface({
  CarrierName: string,
  ProNumber: string,
})

const TransportDetails = Codec.interface({
  PartneredSmallParcelData: optional(PartneredSmallParcelDataOutput),
  NonPartneredSmallParcelData: optional(NonPartneredSmallParcelDataOutput),
  PartneredLtlData: optional(PartneredLtlDataOutput),
  NonPartneredLtlData: optional(NonPartneredLtlDataOutput),
})

export const TransportResult = Codec.interface({
  TransportStatus,
})

export const TransportContent = Codec.interface({
  TransportHeader,
  TransportDetails,
  TransportResult,
})

export const GetTransportContent = Codec.interface({
  TransportContent,
})

export type GetTransportContent = GetType<typeof GetTransportContent>

export const GetTransportContentResponse = Codec.interface({
  GetTransportContentResponse: Codec.interface({
    GetTransportContentResult: GetTransportContent,
  }),
})

export const ConfirmTransportRequest = Codec.interface({
  TransportResult,
})

export type ConfirmTransportRequest = GetType<typeof ConfirmTransportRequest>

export const ConfirmTransportRequestResponse = Codec.interface({
  ConfirmTransportRequestResponse: Codec.interface({
    ConfirmTransportRequestResult: ConfirmTransportRequest,
  }),
})

export const VoidTransportRequest = Codec.interface({
  TransportResult,
})

export type VoidTransportRequest = GetType<typeof VoidTransportRequest>

export const VoidTransportRequestResponse = Codec.interface({
  VoidTransportRequestResponse: Codec.interface({
    VoidTransportRequestResult: VoidTransportRequest,
  }),
})

export const TransportDocument = Codec.interface({
  PdfDocument: string,
  Checksum: string,
})

export const GetPackageLabels = Codec.interface({
  /**
   * Docs has a mistake in the response type
   * They have `TransportContent` instead of `TransportDocument`
   */
  TransportDocument,
})

export type GetPackageLabels = GetType<typeof GetPackageLabels>

export const GetPackageLabelsResponse = Codec.interface({
  GetPackageLabelsResponse: Codec.interface({
    GetPackageLabelsResult: GetPackageLabels,
  }),
})

export const GetUniquePackageLabels = Codec.interface({
  /**
   * Docs has a mistake in the response type
   * They have `TransportContent` instead of `TransportDocument`
   */
  TransportDocument,
})

export type GetUniquePackageLabels = GetType<typeof GetUniquePackageLabels>

export const GetUniquePackageLabelsResponse = Codec.interface({
  GetUniquePackageLabelsResponse: Codec.interface({
    GetUniquePackageLabelsResult: GetUniquePackageLabels,
  }),
})

export const GetPalletLabels = Codec.interface({
  TransportDocument,
})

export type GetPalletLabels = GetType<typeof GetPalletLabels>

export const GetPalletLabelsResponse = Codec.interface({
  GetPalletLabelsResponse: Codec.interface({
    GetPalletLabelsResult: GetPalletLabels,
  }),
})

export const GetBillOfLading = Codec.interface({
  TransportDocument,
})

export type GetBillOfLading = GetType<typeof GetBillOfLading>

export const GetBillOfLadingResponse = Codec.interface({
  GetBillOfLadingResponse: Codec.interface({
    GetBillOfLadingResult: GetBillOfLading,
  }),
})

export enum LabelPrepTypeEnum {
  'NO_LABEL',
  'SELLER_LABEL',
  'AMAZON_LABEL',
}

export const LabelPrepType = enumeration(LabelPrepTypeEnum)

export enum ShipmentStatusEnum {
  'WORKING',
  'SHIPPED',
  'IN_TRANSIT',
  'DELIVERED',
  'CHECKED_IN',
  'RECEIVING',
  'CLOSED',
  'CANCELLED',
  'DELETED',
  'ERROR',
}

const ShipmentStatus = enumeration(ShipmentStatusEnum)

export const InboundShipmentInfo = Codec.interface({
  ShipmentId: optional(string),
  ShipmentName: optional(string),
  ShipFromAddress: FISAddress,
  DestinationFulfillmentCenterId: optional(string),
  LabelPrepType: optional(LabelPrepType),
  ShipmentStatus: optional(ShipmentStatus),
  AreCasesRequired: optional(ensureBool),
  ConfirmedNeedByDate: optional(string),
  BoxContentsSource: optional(string),
  EstimatedBoxContentsFeeDetails: optional(BoxContentsFeeDetails),
})

export const ListInboundShipments = Codec.interface({
  NextToken: optional(nextTokenCodec('ListInboundShipments')),
  ShipmentData: ensureArray('member', InboundShipmentInfo),
})

export type ListInboundShipments = GetType<typeof ListInboundShipments>
export const ListInboundShipmentsResponse = Codec.interface({
  ListInboundShipmentsResponse: Codec.interface({
    ListInboundShipmentsResult: ListInboundShipments,
  }),
})

export const ListInboundShipmentsByNextToken = Codec.interface({
  NextToken: optional(nextTokenCodec('ListInboundShipments')),
  ShipmentData: ensureArray('member', InboundShipmentInfo),
})

export type ListInboundShipmentsByNextToken = GetType<typeof ListInboundShipments>
export const ListInboundShipmentsByNextTokenResponse = Codec.interface({
  ListInboundShipmentsByNextTokenResponse: Codec.interface({
    ListInboundShipmentsByNextTokenResult: ListInboundShipmentsByNextToken,
  }),
})

const InboundShipmentItem = Codec.interface({
  ShipmentId: optional(string),
  SellerSKU: string,
  FulfillmentNetworkSKU: optional(string),
  QuantityShipped: ensureInt,
  QuantityReceived: optional(ensureInt),
  QuantityInCase: optional(ensureInt),
  PrepDetailsList: optional(ensureArray('PrepDetails', PrepDetails)),
  ReleaseDate: optional(string),
})

export const ListInboundShipmentItems = Codec.interface({
  NextToken: optional(nextTokenCodec('ListInboundShipmentItems')),
  ItemData: ensureArray('member', InboundShipmentItem),
})

export type ListInboundShipmentItems = GetType<typeof ListInboundShipmentItems>

export const ListInboundShipmentItemsResponse = Codec.interface({
  ListInboundShipmentItemsResponse: Codec.interface({
    ListInboundShipmentItemsResult: ListInboundShipmentItems,
  }),
})

export const ListInboundShipmentItemsByNextTokenResponse = Codec.interface({
  ListInboundShipmentItemsByNextTokenResponse: Codec.interface({
    ListInboundShipmentItemsByNextTokenResult: ListInboundShipmentItems,
  }),
})
