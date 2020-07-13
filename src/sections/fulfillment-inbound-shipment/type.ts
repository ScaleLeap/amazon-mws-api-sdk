export const canonicalizeInboundShipmentPlanRequestItems = (
  requestItem: InboundShipmentPlanRequestItem,
) => {
  return {
    SellerSKU: requestItem.SellerSKU,
    ASIN: requestItem.ASIN,
    Condition: requestItem.Condition,
    Quantity: requestItem.Quantity,
    QuantityInCase: requestItem.QuantityInCase,
    'PrepDetailsList.PrepDetails': requestItem.PrepDetailsList,
  }
}

export const canonicalizeParametersCreateInboUpdateundShipmentPlan = (
  parameters: CreateInboundShipmentPlanParameters,
) => {
  const fixedInboundShipmentPlanRequestItems = parameters.InboundShipmentPlanRequestItems.map(
    (requestItem) => canonicalizeInboundShipmentPlanRequestItems(requestItem),
  )
  return {
    ShipToCountryCode: parameters.ShipToCountryCode,
    ShipFromAddress: parameters.ShipFromAddress,
    ShipToCountrySubdivisionCode: parameters.ShipToCountrySubdivisionCode,
    LabelPrepPreference: parameters.LabelPrepPreference,
    'InboundShipmentPlanRequestItems.member': fixedInboundShipmentPlanRequestItems,
  }
}

export const canonicalizeInboundShipmentItem = (item: InboundShipmentItem) => {
  let releaseDateString
  if (item.ReleaseDate) {
    // convert releaseDate to YYYY-MM-DD
    const offset = item.ReleaseDate.getTimezoneOffset()
    const releaseDate = new Date(item.ReleaseDate.getTime() + offset * 60 * 1000)
    const [newDate] = releaseDate.toISOString().split('T')
    releaseDateString = newDate
  }

  return {
    ShipmentId: item.ShipmentId,
    SellerSKU: item.SellerSKU,
    FulfillmentNetworkSKU: item.FulfillmentNetworkSKU,
    QuantityShipped: item.QuantityShipped,
    QuantityReceived: item.QuantityReceived,
    QuantityInCase: item.QuantityInCase,
    /**
     * Note: // C# library has this field as 'PrepDetailsList.PrepDetails'
     * but documentation says it's 'PrepDetailsList.member'.
     * Following C# because docs is unreliable
     */
    'PrepDetailsList.PrepDetails': item.PrepDetailsList,
    ReleaseDate: releaseDateString,
  }
}

export const canonicalizeParametersCreateUpdateInboundShipment = (
  parameters: CreateInboundShipmentParameters,
) => {
  const shipmentItemsCanonicalized = parameters.InboundShipmentItems.map((item) =>
    canonicalizeInboundShipmentItem(item),
  )
  return {
    ShipmentId: parameters.ShipmentId,
    InboundShipmentHeader: parameters.InboundShipmentHeader,
    'InboundShipmentItems.member': shipmentItemsCanonicalized,
  }
}

export interface GetInboundGuidanceForSKUParameters {
  SellerSKUList: string[]
  MarketplaceId: string
}

export interface GetInboundGuidanceForASINParameters {
  ASINList: string[]
  MarketplaceId: string
}

export interface AddressFIS {
  Name: string
  AddressLine1: string
  AddressLine2?: string
  City: string
  DistrictOrCounty?: string
  StateOrProvinceCode?: string
  CountryCode: string
  PostalCode?: string
  [key: string]: string | undefined
}

export type LabelPrepPreference = 'SELLER_LABEL' | 'AMAZON_LABEL_ONLY' | 'AMAZON_LABEL_PREFERRED'
export type ConditionFIS =
  | 'NewItem'
  | 'NewWithWarranty'
  | 'NewOEM'
  | 'NewOpenBox'
  | 'UsedLikeNew'
  | 'UsedVeryGood'
  | 'UsedGood'
  | 'UsedAcceptable'
  | 'UsedPoor'
  | 'UsedRefurbished'
  | 'CollectibleLikeNew'
  | 'CollectibleVeryGood'
  | 'CollectibleGood'
  | 'CollectibleAcceptable'
  | 'CollectiblePoor'
  | 'RefurbishedWithWarranty'
  | 'Refurbished'
  | 'Club'

export enum PrepInstructionEnum {
  Polybagging = 'Polybagging',
  BubbleWrapping = 'BubbleWrapping',
  Taping = 'Taping',
  BlackShrinkWrapping = 'BlackShrinkWrapping',
  Labeling = 'Labeling',
  HangGarment = 'HangGarment',
}

export type PrepInstruction = keyof typeof PrepInstructionEnum

export enum PrepOwnerEnum {
  AMAZON = 'AMAZON',
  SELLER = 'SELLER',
}

export type PrepOwner = keyof typeof PrepOwnerEnum

export interface PrepDetails {
  PrepInstruction: PrepInstruction
  PrepOwner: PrepOwner
}

export interface InboundShipmentPlanRequestItem {
  SellerSKU: string
  ASIN?: string
  Condition?: ConditionFIS
  Quantity: number
  QuantityInCase?: number
  PrepDetailsList?: PrepDetails[]
}

export interface CreateInboundShipmentPlanParameters {
  ShipFromAddress: AddressFIS
  ShipToCountryCode?: string
  ShipToCountrySubdivisionCode?: string
  LabelPrepPreference?: LabelPrepPreference
  InboundShipmentPlanRequestItems: InboundShipmentPlanRequestItem[]
}

export type ShipmentStatus = 'WORKING' | 'SHIPPED' | 'CANCELLED'

export type IntendedBoxContentsSource = 'NONE' | 'FEED' | '2D_BARCODE'

export interface InboundShipmentHeader {
  ShipmentName: string
  ShipFromAddress: AddressFIS
  DestinationFulfillmentCenterId: string
  LabelPrepPreference: LabelPrepPreference
  AreCasesRequired?: boolean
  ShipmentStatus: ShipmentStatus
  IntendedBoxContentsSource?: IntendedBoxContentsSource
  [key: string]: string | undefined | boolean | AddressFIS
}

export interface InboundShipmentItem {
  ShipmentId?: string
  SellerSKU: string
  FulfillmentNetworkSKU?: string
  QuantityShipped: number
  QuantityReceived?: number
  QuantityInCase?: number
  PrepDetailsList?: PrepDetails[]
  ReleaseDate?: Date // convert to YYYY-MM-DD format
}

export interface CreateInboundShipmentParameters {
  ShipmentId: string
  InboundShipmentHeader: InboundShipmentHeader
  InboundShipmentItems: InboundShipmentItem[]
}

export interface GetPreorderInfoParameters {
  ShipmentId: string
}

export interface ConfirmPreorderParameters {
  ShipmentId: string
  NeedByDate: Date
}

export interface GetPrepInstructionsForSKUParameters {
  SellerSKUList: string[]
  ShipToCountryCode: string
}

export interface GetPrepInstructionsForASINParameters {
  ASINList: string[]
  ShipToCountryCode: string
}
