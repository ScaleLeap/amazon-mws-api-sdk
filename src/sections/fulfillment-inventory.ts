import { Codec, exactly, GetInterface, number, oneOf, optional, string } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { ensureArray, mwsDate, NextToken, nextToken as nextTokenCodec } from '../parsing'
import { getServiceStatusByResource } from './shared'
import { RequireOnlyOne } from './types'

const FULFILLMENT_INVENTORY_API_VERSION = '2010-10-01'

enum Condition {
  NewItem = 'NewItem',
  NewWithWarranty = 'NewWithWarranty',
  NewOEM = 'NewOEM',
  NewOpenBox = 'NewOpenBox',
  UsedLikeNew = 'UsedLikeNew',
  UsedVeryGood = 'UsedVeryGood',
  UsedGood = 'UsedGood',
  UsedAcceptable = 'UsedAcceptable',
  UsedPoor = 'UsedPoor',
  UsedRefurbished = 'UsedRefurbished',
  CollectibleLikeNew = 'CollectibleLikeNew',
  CollectibleVeryGood = 'CollectibleVeryGood',
  CollectibleGood = 'CollectibleGood',
  CollectibleAcceptable = 'CollectibleAcceptable',
  CollectiblePoor = 'CollectiblePoor',
  RefurbishedWithWarranty = 'RefurbishedWithWarranty',
  Refurbished = 'Refurbished',
  Club = 'Club',
  // InventorySupplyListByNextToken fixture has condition with an empty string as value
  '' = '',
}

enum TimepointType {
  Immediately = 'Immediately',
  DateTime = 'DateTime',
  Unknown = 'Unknown',
}

enum SupplyType {
  InStock = 'InStock',
  Inbound = 'Inbound',
  Transfer = 'Transfer',
}

const Timepoint = Codec.interface({
  TimepointType: oneOf(Object.values(TimepointType).map((x) => exactly(x))),
  DateTime: optional(mwsDate),
})

const InventorySupplyDetail = Codec.interface({
  Quantity: number,
  SupplyType: oneOf(Object.values(SupplyType).map((x) => exactly(x))),
  EarliestAvailableToPick: Timepoint,
  LatestAvailableToPick: Timepoint,
})

const InventorySupply = Codec.interface({
  SellerSKU: optional(string),
  FNSKU: string,
  ASIN: optional(string),
  Condition: optional(oneOf(Object.values(Condition).map((x) => exactly(x)))),
  TotalSupplyQuantity: number,
  InStockSupplyQuantity: number,
  EarliestAvailability: optional(Timepoint),
  SupplyDetail: optional(ensureArray('member', InventorySupplyDetail)),
})

const InventorySupplyList = Codec.interface({
  NextToken: optional(nextTokenCodec('ListInventorySupply')),
  MarketplaceId: optional(string),
  InventorySupplyList: ensureArray('member', InventorySupply),
})

type InventorySupplyList = GetInterface<typeof InventorySupplyList>

const ListInventorySupplyResponse = Codec.interface({
  ListInventorySupplyResponse: Codec.interface({
    ListInventorySupplyResult: InventorySupplyList,
  }),
})

const InventorySupplyListByNextToken = Codec.interface({
  NextToken: optional(nextTokenCodec('ListInventorySupply')),
  InventorySupplyList: ensureArray('member', InventorySupply),
})

type InventorySupplyListByNextToken = GetInterface<typeof InventorySupplyListByNextToken>

const ListInventorySupplyByNextTokenResponse = Codec.interface({
  ListInventorySupplyByNextTokenResponse: Codec.interface({
    ListInventorySupplyByNextTokenResult: InventorySupplyListByNextToken,
  }),
})

const canonicalizeParameters = (parameters: ListInventorySupplyRequestParameters) => {
  return {
    'SellersSkus.member': parameters.SellerSku,
    QueryStartDateTime: parameters.QueryStartDateTime?.toISOString(),
    ResponseGroup: parameters.ResponseGroup,
    MarketplaceId: parameters.MarketplaceId,
  }
}

interface ListInventorySupplyRequestParameters {
  SellerSku?: string[]
  QueryStartDateTime?: Date
  ResponseGroup?: 'Basic' | 'Detailed'
  MarketplaceId?: string
}

export class FulfillmentInventory {
  constructor(private httpClient: HttpClient) {}

  async listInventorySupply(
    parameters: RequireOnlyOne<
      ListInventorySupplyRequestParameters,
      'MarketplaceId' | 'QueryStartDateTime'
    >,
  ): Promise<[InventorySupplyList, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfilmentInventory,
      version: FULFILLMENT_INVENTORY_API_VERSION,
      action: 'ListInventorySupply',
      parameters: canonicalizeParameters(parameters),
    })

    return ListInventorySupplyResponse.decode(response).caseOf({
      Right: (x) => [x.ListInventorySupplyResponse.ListInventorySupplyResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async listInventorySupplyByNextToken(
    nextToken: NextToken<'ListInventorySupply'>,
  ): Promise<[InventorySupplyListByNextToken, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfilmentInventory,
      version: FULFILLMENT_INVENTORY_API_VERSION,
      action: 'ListInventorySupplyByNextToken',
      parameters: { NextToken: nextToken.token },
    })

    return ListInventorySupplyByNextTokenResponse.decode(response).caseOf({
      Right: (x) => [
        x.ListInventorySupplyByNextTokenResponse.ListInventorySupplyByNextTokenResult,
        meta,
      ],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getServiceStatus() {
    return getServiceStatusByResource(
      this.httpClient,
      Resource.FulfilmentInventory,
      FULFILLMENT_INVENTORY_API_VERSION,
    )
  }
}
