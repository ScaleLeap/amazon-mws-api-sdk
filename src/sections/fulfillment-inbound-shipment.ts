import { Codec, enumeration, GetInterface, number, optional, string } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { ensureArray, ensureString } from '../parsing'
import { getServiceStatusByResource } from './shared'

const FULFILLMENT_INBOUND_SHIPMENT_API_VERSION = '2010-10-01'

interface GetInboundGuidanceForSKUParameters {
  SellerSKUList: string[]
  MarketplaceId: string
}

enum GuidanceReasonEnum {
  SlowMovingASIN = 'SlowMovingASIN',
  NoApplicableGuidance = 'NoApplicableGuidance',
}

enum InboundGuidanceEnum {
  InboundNotRecommended = 'InboundNotRecommended',
  InboundOK = 'InboundOK',
}

const GuidanceReason = enumeration(GuidanceReasonEnum)
const InboundGuidance = enumeration(InboundGuidanceEnum)

const SKUInboundGuidance = Codec.interface({
  SellerSKU: string,
  ASIN: string,
  InboundGuidance,
  GuidanceReasonList: optional(ensureArray('GuidanceReason', GuidanceReason)),
})

const InvalidSKU = Codec.interface({
  SellerSKU: string,
  ErrorReason: string,
})

const GetInboundGuidanceForSKU = Codec.interface({
  SKUInboundGuidanceList: ensureArray('SKUInboundGuidance', SKUInboundGuidance),
  InvalidSKUList: optional(ensureArray('InvalidSKU', InvalidSKU)),
})

type GetInboundGuidanceForSKU = GetInterface<typeof GetInboundGuidanceForSKU>

const GetInboundGuidanceForSKUResponse = Codec.interface({
  GetInboundGuidanceForSKUResponse: Codec.interface({
    GetInboundGuidanceForSKUResult: GetInboundGuidanceForSKU,
  }),
})

const InvalidASIN = Codec.interface({
  ASIN: string,
  ErrorReason: string,
})

const ASINInboundGuidance = Codec.interface({
  ASIN: string,
  InboundGuidance,
  GuidanceReasonList: optional(ensureArray('GuidanceReason', GuidanceReason)),
})

const GetInboundGuidanceForASIN = Codec.interface({
  ASINInboundGuidanceList: ensureArray('ASINInboundGuidance', ASINInboundGuidance),
  InvalidASINList: ensureArray('InvalidASIN', InvalidASIN),
})

type GetInboundGuidanceForASIN = GetInterface<typeof GetInboundGuidanceForASIN>

const GetInboundGuidanceForASINResponse = Codec.interface({
  GetInboundGuidanceForASINResponse: Codec.interface({
    GetInboundGuidanceForASINResult: GetInboundGuidanceForASIN,
  }),
})

interface GetInboundGuidanceForASINParameters {
  ASINList: string[]
  MarketplaceId: string
}

interface AddressFIS {
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
type ConditionFIS =
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

enum PrepInstructionEnum {
  Polybagging = 'Polybagging',
  BubbleWrapping = 'BubbleWrapping',
  Taping = 'Taping',
  BlackShrinkWrapping = 'BlackShrinkWrapping',
  Labeling = 'Labeling',
  HangGarment = 'HangGarment',
}

type PrepInstruction = keyof typeof PrepInstructionEnum

enum PrepOwnerEnum {
  AMAZON = 'AMAZON',
  SELLER = 'SELLER',
}

type PrepOwner = keyof typeof PrepOwnerEnum

interface PrepDetails {
  PrepInstruction: PrepInstruction
  PrepOwner: PrepOwner
}

interface InboundShipmentPlanRequestItem {
  SellerSKU: string
  ASIN?: string
  Condition?: ConditionFIS
  Quantity: number
  QuantityInCase?: number
  PrepDetailsList?: PrepDetails[]
}

interface CreateInboundShipmentPlanParameters {
  ShipFromAddress: AddressFIS
  ShipToCountryCode?: string
  ShipToCountrySubdivisionCode?: string
  LabelPrepPreference?: LabelPrepPreference
  InboundShipmentPlanRequestItems: InboundShipmentPlanRequestItem[]
}

const canonicalizeInboundShipmentPlanRequestItems = (
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

const canonicalizeParametersCreateInboundShipmentPlan = (
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

const InboundShipmentPlanItem = Codec.interface({
  SellerSKU: string,
  FulfillmentNetworkSKU: string,
  Quantity: number,
  PrepDetailsList: optional(ensureArray('PrepDetails', PrepDetails)),
})

const Amount = Codec.interface({
  CurrencyCode: string,
  Value: ensureString,
})

const BoxContentsFeeDetails = Codec.interface({
  TotalUnits: optional(number),
  FeePerUnit: optional(Amount),
  TotalFee: optional(Amount),
})

const InboundShipmentPlan = Codec.interface({
  ShipmentId: string,
  DestinationFulfillmentCenterId: string,
  ShipToAddress: AddressFIS,
  LabelPrepType: string,
  Items: ensureArray('member', InboundShipmentPlanItem),
  EstimatedBoxContentsFee: optional(BoxContentsFeeDetails),
})

const CreateInboundShipmentPlan = Codec.interface({
  InboundShipmentPlans: ensureArray('member', InboundShipmentPlan),
})

type CreateInboundShipmentPlan = GetInterface<typeof CreateInboundShipmentPlan>

const CreateInboundShipmentPlanResponse = Codec.interface({
  CreateInboundShipmentPlanResponse: Codec.interface({
    CreateInboundShipmentPlanResult: CreateInboundShipmentPlan,
  }),
})

export type ShipmentStatus = 'WORKING' | 'SHIPPED' | 'CANCELLED'

type IntendedBoxContentsSource = 'NONE' | 'FEED' | '2D_BARCODE'

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

interface InboundShipmentItem {
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

const canonicalizeInboundShipmentItem = (item: InboundShipmentItem) => {
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

const canonicalizeParametersCreateInboundShipment = (
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

const CreateInboundShipment = Codec.interface({
  ShipmentId: string,
})

type CreateInboundShipment = GetInterface<typeof CreateInboundShipment>

const CreateInboundShipmentResponse = Codec.interface({
  CreateInboundShipmentResponse: Codec.interface({
    CreateInboundShipmentResult: CreateInboundShipment,
  }),
})

export class FulfillmentInboundShipment {
  constructor(private httpClient: HttpClient) {}

  async createInboundShipment(
    parameters: CreateInboundShipmentParameters,
  ): Promise<[CreateInboundShipment, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'CreateInboundShipment',
      parameters: canonicalizeParametersCreateInboundShipment(parameters),
    })

    return CreateInboundShipmentResponse.decode(response).caseOf({
      Right: (x) => [x.CreateInboundShipmentResponse.CreateInboundShipmentResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async createInboundShipmentPlan(
    parameters: CreateInboundShipmentPlanParameters,
  ): Promise<[CreateInboundShipmentPlan, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'CreateInboundShipmentPlan',
      parameters: canonicalizeParametersCreateInboundShipmentPlan(parameters),
    })

    return CreateInboundShipmentPlanResponse.decode(response).caseOf({
      Right: (x) => [x.CreateInboundShipmentPlanResponse.CreateInboundShipmentPlanResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getInboundGuidanceForAsin(
    parameters: GetInboundGuidanceForASINParameters,
  ): Promise<[GetInboundGuidanceForASIN, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'GetInboundGuidanceForASIN',
      parameters: {
        'ASINList.Id': parameters.ASINList,
        MarketplaceId: parameters.MarketplaceId,
      },
    })

    return GetInboundGuidanceForASINResponse.decode(response).caseOf({
      Right: (x) => [x.GetInboundGuidanceForASINResponse.GetInboundGuidanceForASINResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getInboundGuidanceForSku(
    parameters: GetInboundGuidanceForSKUParameters,
  ): Promise<[GetInboundGuidanceForSKU, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'GetInboundGuidanceForSKU',
      parameters: {
        'SellerSKUList.Id': parameters.SellerSKUList,
        MarketplaceId: parameters.MarketplaceId,
      },
    })

    return GetInboundGuidanceForSKUResponse.decode(response).caseOf({
      Right: (x) => [x.GetInboundGuidanceForSKUResponse.GetInboundGuidanceForSKUResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getServiceStatus() {
    return getServiceStatusByResource(
      this.httpClient,
      Resource.FulfillmentInboundShipment,
      FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
    )
  }
}
