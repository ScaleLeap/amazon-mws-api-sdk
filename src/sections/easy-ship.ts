import { Codec, GetInterface, string } from 'purify-ts'

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

export class EasyShip {
  constructor(private httpClient: HttpClient) {}

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
