import { ParsingError } from '../../error'
import { HttpClient, RequestMeta, Resource } from '../../http'
import { getServiceStatusByResource } from '../shared'
import {
  CreateFulfillmentOrderResponse,
  GetFulfillmentPreview,
  GetFulfillmentPreviewResponse,
  UpdateFulfillmentOrderResponse,
} from './codec'
import {
  canonicalizeCreateFulfillmentOrderParameters,
  canonicalizeGetFulfillmentPreviewParameters,
  canonicalizeUpdateFulfillmentOrderParameters,
  CreateFulfillmentOrderParameters,
  GetFulfillmentPreviewParameters,
  UpdateFulfillmentOrderParameters,
} from './type'

const FOS_API_VERSION = '2010-10-01'

export class FulfillmentOutboundShipment {
  constructor(private httpClient: HttpClient) {}

  async updateFulfillmentOrder(
    parameters: UpdateFulfillmentOrderParameters,
  ): Promise<['', RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentOutboundShipment,
      version: FOS_API_VERSION,
      action: 'UpdateFulfillmentOrder',
      parameters: canonicalizeUpdateFulfillmentOrderParameters(parameters),
    })

    return UpdateFulfillmentOrderResponse.decode(response).caseOf({
      Right: () => ['', meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async createFulfillmentOrder(
    parameters: CreateFulfillmentOrderParameters,
  ): Promise<['', RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentOutboundShipment,
      version: FOS_API_VERSION,
      action: 'CreateFulfillmentOrder',
      parameters: canonicalizeCreateFulfillmentOrderParameters(parameters),
    })

    return CreateFulfillmentOrderResponse.decode(response).caseOf({
      Right: () => ['', meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getFulfillmentPreview(
    parameters: GetFulfillmentPreviewParameters,
  ): Promise<[GetFulfillmentPreview, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentOutboundShipment,
      version: FOS_API_VERSION,
      action: 'GetFulfillmentPreview',
      parameters: canonicalizeGetFulfillmentPreviewParameters(parameters),
    })

    return GetFulfillmentPreviewResponse.decode(response).caseOf({
      Right: (x) => [x.GetFulfillmentPreviewResponse.GetFulfillmentPreviewResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getServiceStatus() {
    return getServiceStatusByResource(
      this.httpClient,
      Resource.FulfillmentOutboundShipment,
      FOS_API_VERSION,
    )
  }
}
