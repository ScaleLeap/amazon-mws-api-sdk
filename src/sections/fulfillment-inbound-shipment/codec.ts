import { boolean, Codec, enumeration, GetInterface, number, optional, string } from 'purify-ts'

import { ensureArray, ensureString } from '../../parsing'
import { CreateInboundShipmentParameters, PrepInstructionEnum, PrepOwnerEnum } from './type'

enum GuidanceReasonEnum {
  SlowMovingASIN = 'SlowMovingASIN',
  NoApplicableGuidance = 'NoApplicableGuidance',
}

enum InboundGuidanceEnum {
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

export type GetInboundGuidanceForSKU = GetInterface<typeof GetInboundGuidanceForSKU>

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

export type GetInboundGuidanceForASIN = GetInterface<typeof GetInboundGuidanceForASIN>

export const GetInboundGuidanceForASINResponse = Codec.interface({
  GetInboundGuidanceForASINResponse: Codec.interface({
    GetInboundGuidanceForASINResult: GetInboundGuidanceForASIN,
  }),
})

export const CreateInboundShipment = Codec.interface({
  ShipmentId: string,
})

export type CreateInboundShipment = GetInterface<typeof CreateInboundShipment>

export const CreateInboundShipmentResponse = Codec.interface({
  CreateInboundShipmentResponse: Codec.interface({
    CreateInboundShipmentResult: CreateInboundShipment,
  }),
})

export type UpdateInboundShipmentParameters = CreateInboundShipmentParameters

export const UpdateInboundShipment = Codec.interface({
  ShipmentId: string,
})

export type UpdateInboundShipment = GetInterface<typeof UpdateInboundShipment>

export const UpdateInboundShipmentResponse = Codec.interface({
  UpdateInboundShipmentResponse: Codec.interface({
    UpdateInboundShipmentResult: UpdateInboundShipment,
  }),
})

const AddressFIS = Codec.interface({
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
  Quantity: number,
  PrepDetailsList: optional(ensureArray('PrepDetails', PrepDetails)),
})

export const Amount = Codec.interface({
  CurrencyCode: string,
  Value: ensureString,
})

export const BoxContentsFeeDetails = Codec.interface({
  TotalUnits: optional(number),
  FeePerUnit: optional(Amount),
  TotalFee: optional(Amount),
})

export const InboundShipmentPlan = Codec.interface({
  ShipmentId: string,
  DestinationFulfillmentCenterId: string,
  ShipToAddress: AddressFIS,
  LabelPrepType: string,
  Items: ensureArray('member', InboundShipmentPlanItem),
  EstimatedBoxContentsFee: optional(BoxContentsFeeDetails),
})

export const CreateInboundShipmentPlan = Codec.interface({
  InboundShipmentPlans: ensureArray('member', InboundShipmentPlan),
})

export type CreateInboundShipmentPlan = GetInterface<typeof CreateInboundShipmentPlan>

export const CreateInboundShipmentPlanResponse = Codec.interface({
  CreateInboundShipmentPlanResponse: Codec.interface({
    CreateInboundShipmentPlanResult: CreateInboundShipmentPlan,
  }),
})

export const GetPreorderInfo = Codec.interface({
  ShipmentContainsPreorderableItems: boolean,
  NeedByDate: string,
  ConfirmedFulfillableDate: string,
  ShipmentConfirmedForPreorder: boolean,
})

export type GetPreorderInfo = GetInterface<typeof GetPreorderInfo>

export const GetPreorderInfoResponse = Codec.interface({
  GetPreorderInfoResponse: Codec.interface({
    GetPreorderInfoResult: GetPreorderInfo,
  }),
})

const ConfirmPreorder = Codec.interface({
  ConfirmedNeedByDate: string,
  ConfirmedFulfillableDate: string,
})

export type ConfirmPreorder = GetInterface<typeof ConfirmPreorder>

export const ConfirmPreorderResponse = Codec.interface({
  ConfirmPreorderResponse: Codec.interface({
    ConfirmPreorderResult: ConfirmPreorder,
  }),
})

enum BarcodeInstructionEnum {
  RequiresFNSKULabel = 'RequiresFNSKULabel',
  CanUseOriginalBarcode = 'CanUserOriginalBarcode',
}

const BarcodeInstruction = enumeration(BarcodeInstructionEnum)

enum PrepGuidanceEnum {
  ConsultHelpDocuments = 'ConsultHelpDocuments',
  NoAdditionalPrepRequired = 'NoAdditionalPrepRequired',
  SeePrepInstructionsList = 'SeePrepInstructionsList',
}

const PrepGuidance = enumeration(PrepGuidanceEnum)

const PrepInstruction = enumeration(PrepInstructionEnum)

const AmazonPrepFeesDetails = Codec.interface({
  PrepInstruction,
  FeePerUnit: Amount,
})

const SKUPrepInstructions = Codec.interface({
  SellerSKU: string,
  ASIN: string,
  BarcodeInstruction,
  PrepGuidance,
  PrepInstructionList: ensureArray('PrepInstruction', PrepInstruction),
  AmazonPrepFeesDetailsList: ensureArray('AmazonPrepFeesDetails', AmazonPrepFeesDetails),
})

const GetPrepInstructionsForSKU = Codec.interface({
  SKUPrepInstructionsList: ensureArray('SKUPrepInstructions', SKUPrepInstructions),
  InvalidSKUList: ensureArray('InvalidSKU', InvalidSKU),
})

export type GetPrepInstructionsForSKU = GetInterface<typeof GetPrepInstructionsForSKU>

export const GetPrepInstructionsForSKUResponse = Codec.interface({
  GetPrepInstructionsForSKUResponse: Codec.interface({
    GetPrepInstructionsForSKUResult: GetPrepInstructionsForSKU,
  }),
})

const ASINPrepInstructions = Codec.interface({
  ASIN: string,
  BarcodeInstruction,
  PrepGuidance,
  PrepInstructionList: ensureArray('PrepInstruction', PrepInstruction),
})

const GetPrepInstructionsForASIN = Codec.interface({
  ASINPrepInstructionsList: ensureArray('ASINPrepInstructions', ASINPrepInstructions),
  InvalidASINList: ensureArray('InvalidASIN', InvalidASIN),
})

export type GetPrepInstructionsForASIN = GetInterface<typeof GetPrepInstructionsForASIN>

export const GetPrepInstructionsForASINResponse = Codec.interface({
  GetPrepInstructionsForASINResponse: Codec.interface({
    GetPrepInstructionsForASINResult: GetPrepInstructionsForASIN,
  }),
})

enum TransportStatusEnum {
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

const TransportStatus = enumeration(TransportStatusEnum)

const PutTransportContent = Codec.interface({
  TransportResult: Codec.interface({
    TransportStatus,
  }),
})

export type PutTransportContent = GetInterface<typeof PutTransportContent>

export const PutTransportContentResponse = Codec.interface({
  PutTransportContentResponse: Codec.interface({
    PutTransportContentResult: PutTransportContent,
  }),
})

const EstimateTransportRequest = Codec.interface({
  TransportResult: Codec.interface({
    TransportStatus,
  }),
})

export type EstimateTransportRequest = GetInterface<typeof EstimateTransportRequest>

export const EstimateTransportRequestResponse = Codec.interface({
  EstimateTransportRequestResponse: Codec.interface({
    EstimateTransportRequestResult: EstimateTransportRequest,
  }),
})
