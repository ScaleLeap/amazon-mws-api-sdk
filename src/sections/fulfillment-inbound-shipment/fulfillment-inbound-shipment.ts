import { ParsingError } from '../../error'
import { HttpClient, RequestMeta, Resource } from '../../http'
import { getServiceStatusByResource } from '../shared'
import {
  CreateInboundShipment,
  CreateInboundShipmentPlan,
  CreateInboundShipmentPlanResponse,
  CreateInboundShipmentResponse,
  GetInboundGuidanceForASIN,
  GetInboundGuidanceForASINResponse,
  GetInboundGuidanceForSKU,
  GetInboundGuidanceForSKUResponse,
  UpdateInboundShipment,
  UpdateInboundShipmentParameters,
  UpdateInboundShipmentResponse,
} from './codec'
import {
  canonicalizeParametersCreateInboUpdateundShipmentPlan,
  canonicalizeParametersCreateUpdateInboundShipment,
  CreateInboundShipmentParameters,
  CreateInboundShipmentPlanParameters,
  GetInboundGuidanceForASINParameters,
  GetInboundGuidanceForSKUParameters,
} from './type'

const FULFILLMENT_INBOUND_SHIPMENT_API_VERSION = '2010-10-01'

export class FulfillmentInboundShipment {
  constructor(private httpClient: HttpClient) {}

  async updateInboundShipment(
    parameters: UpdateInboundShipmentParameters,
  ): Promise<[UpdateInboundShipment, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'UpdateInboundShipment',
      parameters: canonicalizeParametersCreateUpdateInboundShipment(parameters),
    })

    return UpdateInboundShipmentResponse.decode(response).caseOf({
      Right: (x) => [x.UpdateInboundShipmentResponse.UpdateInboundShipmentResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async createInboundShipment(
    parameters: CreateInboundShipmentParameters,
  ): Promise<[CreateInboundShipment, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'CreateInboundShipment',
      parameters: canonicalizeParametersCreateUpdateInboundShipment(parameters),
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
      parameters: canonicalizeParametersCreateInboUpdateundShipmentPlan(parameters),
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
