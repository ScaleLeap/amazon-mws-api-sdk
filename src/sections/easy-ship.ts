import { Codec, GetInterface, number, optional, string } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { ensureArray, ensureString, mwsDate } from '../parsing'
import { getServiceStatusByResource } from './shared'

const EASY_SHIP_API_VERSION = '2018-09-01'

interface ESDimensions {
  Length: number
  Width: number
  Height: number
  Unit: string // docs does not specify possible values for this one
  Name?: string
  [key: string]: string | number | undefined
}

interface ESWeight {
  Value: number
  Unit: string
  [key: string]: string | number
}

interface ListPickupSlotsParameters {
  MarketplaceId: string
  AmazonOrderId: string
  PackageDimensions: ESDimensions
  PackageWeight: ESWeight
}

const PickupSlot = Codec.interface({
  SlotId: ensureString,
  PickupTimeStart: mwsDate,
  PickupTimeEnd: mwsDate,
})

const ListPickupSlots = Codec.interface({
  AmazonOrderId: string,
  PickupSlotList: ensureArray('PickupSlot', PickupSlot),
})

type ListPickupSlots = GetInterface<typeof ListPickupSlots>

const ListPickupSlotsResponse = Codec.interface({
  ListPickupSlotsResponse: Codec.interface({
    ListPickupSlotsResult: ListPickupSlots,
  }),
})

interface Item {
  OrderItemId: string
  OrderItemSerialNumberList: string
}

interface PickupSlot {
  SlotId: string
  PickupTimeStart: Date
  PickupTimeEnd: Date
}

interface PackageRequestDetails {
  PackageDimensions?: ESDimensions
  PackageWeight?: ESWeight
  PackageItemList?: Item[]
  PackagePickupSlot: PickupSlot
  PackageIdentifier?: string
}

interface CreateScheduledPackageParameters {
  AmazonOrderId: string
  MarketplaceId: string
  PackageRequestDetails: PackageRequestDetails
}

const ScheduledPackageId = Codec.interface({
  AmazonOrderId: string,
  PackageId: optional(string),
})

const ESDimensions = Codec.interface({
  Length: number,
  Width: number,
  Height: number,
  Unit: string,
  Name: optional(string),
})

const ESWeight = Codec.interface({
  Value: number,
  Unit: string,
})

const Item = Codec.interface({
  OrderItemId: string,
  OrderItemSerialNumberList: ensureArray('member', string),
})

const InvoiceData = Codec.interface({
  InvoiceNumber: string,
  InvoiceDate: optional(mwsDate),
})

const Package = Codec.interface({
  ScheduledPackageId,
  PackageDimensions: ESDimensions,
  PackageWeight: ESWeight,
  PackageItemsList: optional(ensureArray('Item', Item)),
  PackagePickupSlot: PickupSlot,
  PackageIdentifier: optional(string),
  Invoice: optional(InvoiceData),
  PackageStatus: optional(string),
})

const CreateScheduledPackage = Codec.interface({
  ScheduledPackage: Package,
})

type CreateScheduledPackage = GetInterface<typeof CreateScheduledPackage>

const CreateScheduledPackageResponse = Codec.interface({
  CreateScheduledPackageResponse: Codec.interface({
    CreateScheduledPackageResult: CreateScheduledPackage,
  }),
})

interface ScheduledPackageId {
  AmazonOrderId: string
  PackageId?: string
}

interface ScheduledPackageUpdateDetails {
  ScheduledPackageId: ScheduledPackageId
  PackagePickupSlot: PickupSlot
}

interface UpdateScheduledPackagesParameters {
  MarketplaceId: string
  ScheduledPackageUpdateDetailsList: ScheduledPackageUpdateDetails[]
}

const UpdateScheduledPackages = Codec.interface({
  ScheduledPackageList: ensureArray('Package', Package),
})

type UpdateScheduledPackages = GetInterface<typeof UpdateScheduledPackages>

const UpdateScheduledPackagesResponse = Codec.interface({
  UpdateScheduledPackagesResponse: Codec.interface({
    UpdateScheduledPackagesResult: UpdateScheduledPackages,
  }),
})

interface GetScheduledPackageParameters {
  ScheduledPackageId: ScheduledPackageId
  MarketplaceId: string
}

const GetScheduledPackage = Codec.interface({
  ScheduledPackage: Package,
})

type GetScheduledPackage = GetInterface<typeof GetScheduledPackage>

const GetScheduledPackageResponse = Codec.interface({
  GetScheduledPackageResponse: Codec.interface({
    GetScheduledPackageResult: GetScheduledPackage,
  }),
})

export class EasyShip {
  constructor(private httpClient: HttpClient) {}

  async getScheduledPackage(
    parameters: GetScheduledPackageParameters,
  ): Promise<[GetScheduledPackage, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.EasyShip,
      version: EASY_SHIP_API_VERSION,
      action: 'GetScheduledPackage',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
        ScheduledPackageId: {
          AmazonOrderId: parameters.ScheduledPackageId.AmazonOrderId,
          PackageId: parameters.ScheduledPackageId.PackageId,
        },
      },
    })

    return GetScheduledPackageResponse.decode(response).caseOf({
      Right: (x) => [x.GetScheduledPackageResponse.GetScheduledPackageResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async updateScheduledPackages(
    parameters: UpdateScheduledPackagesParameters,
  ): Promise<[UpdateScheduledPackages, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.EasyShip,
      version: EASY_SHIP_API_VERSION,
      action: 'UpdateScheduledPackages',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
        'ScheduledPackageUpdateDetailsList.PackageUpdateDetails': parameters.ScheduledPackageUpdateDetailsList.map(
          (packageUpdate) => {
            return {
              ScheduledPackageId: packageUpdate.ScheduledPackageId,
              PackagePickupSlot: {
                SlotId: packageUpdate.PackagePickupSlot.SlotId,
                PickupTimeStart: packageUpdate.PackagePickupSlot.PickupTimeStart.toISOString(),
                PickupTimeEnd: packageUpdate.PackagePickupSlot.PickupTimeEnd.toISOString(),
              },
            }
          },
        ),
      },
    })

    return UpdateScheduledPackagesResponse.decode(response).caseOf({
      Right: (x) => [x.UpdateScheduledPackagesResponse.UpdateScheduledPackagesResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async createScheduledPackage(
    parameters: CreateScheduledPackageParameters,
  ): Promise<[CreateScheduledPackage, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.EasyShip,
      version: EASY_SHIP_API_VERSION,
      action: 'CreateScheduledPackage',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
        AmazonOrderId: parameters.AmazonOrderId,
        PackageRequestDetails: {
          PackageDimensions: parameters.PackageRequestDetails.PackageDimensions,
          PackageWeight: parameters.PackageRequestDetails.PackageWeight,
          PackagePickupSlot: {
            SlotId: parameters.PackageRequestDetails.PackagePickupSlot.SlotId,
            PickupTimeStart: parameters.PackageRequestDetails.PackagePickupSlot.PickupTimeStart.toISOString(),
            PickupTimeEnd: parameters.PackageRequestDetails.PackagePickupSlot.PickupTimeEnd.toISOString(),
          },
        },
        PackageIdentifier: parameters.PackageRequestDetails.PackageIdentifier,
      },
    })

    return CreateScheduledPackageResponse.decode(response).caseOf({
      Right: (x) => [x.CreateScheduledPackageResponse.CreateScheduledPackageResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async listPickupSlots(
    parameters: ListPickupSlotsParameters,
  ): Promise<[ListPickupSlots, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.EasyShip,
      version: EASY_SHIP_API_VERSION,
      action: 'ListPickupSlots',
      parameters: {
        MarketplaceId: parameters.MarketplaceId,
        AmazonOrderId: parameters.AmazonOrderId,
        PackageDimensions: parameters.PackageDimensions,
        PackageWeight: parameters.PackageWeight,
      },
    })

    return ListPickupSlotsResponse.decode(response).caseOf({
      Right: (x) => [x.ListPickupSlotsResponse.ListPickupSlotsResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getServiceStatus() {
    return getServiceStatusByResource(this.httpClient, Resource.EasyShip, EASY_SHIP_API_VERSION)
  }
}
