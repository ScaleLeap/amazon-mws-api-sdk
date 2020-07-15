import { ParsingError } from '../../error'
import { HttpClient, RequestMeta, Resource } from '../../http'
import { getServiceStatusByResource } from '../shared'
import {
  ConfirmPreorder,
  ConfirmPreorderResponse,
  ConfirmTransportRequest,
  ConfirmTransportRequestResponse,
  CreateInboundShipment,
  CreateInboundShipmentPlan,
  CreateInboundShipmentPlanResponse,
  CreateInboundShipmentResponse,
  EstimateTransportRequest,
  EstimateTransportRequestResponse,
  GetBillOfLading,
  GetBillOfLadingResponse,
  GetInboundGuidanceForASIN,
  GetInboundGuidanceForASINResponse,
  GetInboundGuidanceForSKU,
  GetInboundGuidanceForSKUResponse,
  GetPackageLabels,
  GetPackageLabelsResponse,
  GetPalletLabels,
  GetPalletLabelsResponse,
  GetPreorderInfo,
  GetPreorderInfoResponse,
  GetPrepInstructionsForASIN,
  GetPrepInstructionsForASINResponse,
  GetPrepInstructionsForSKU,
  GetPrepInstructionsForSKUResponse,
  GetTransportContent,
  GetTransportContentResponse,
  GetUniquePackageLabels,
  GetUniquePackageLabelsResponse,
  ListInboundShipments,
  ListInboundShipmentsResponse,
  PutTransportContent,
  PutTransportContentResponse,
  UpdateInboundShipment,
  UpdateInboundShipmentParameters,
  UpdateInboundShipmentResponse,
  VoidTransportRequest,
  VoidTransportRequestResponse,
} from './codec'
import {
  canonicalizeParametersCreateInboUpdateundShipmentPlan,
  canonicalizeParametersCreateUpdateInboundShipment,
  canonicalizePutTransportContentParameters,
  ConfirmPreorderParameters,
  ConfirmTransportRequestParameters,
  CreateInboundShipmentParameters,
  CreateInboundShipmentPlanParameters,
  EstimateTransportRequestParameters,
  GetBillOfLadingParameters,
  GetInboundGuidanceForASINParameters,
  GetInboundGuidanceForSKUParameters,
  GetPackageLabelsParameters,
  GetPalletLabelsParameters,
  GetPreorderInfoParameters,
  GetPrepInstructionsForASINParameters,
  GetPrepInstructionsForSKUParameters,
  GetTransportContentParameters,
  GetUniquePackageLabelsParameters,
  ListInboundShipmentsParameters,
  PutTransportContentParameters,
  VoidTransportRequestParameters,
} from './type'

const FULFILLMENT_INBOUND_SHIPMENT_API_VERSION = '2010-10-01'

export class FulfillmentInboundShipment {
  constructor(private httpClient: HttpClient) {}

  async listInboundShipments(
    parameters: ListInboundShipmentsParameters,
  ): Promise<[ListInboundShipments, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'ListInboundShipments',
      parameters: {
        'ShipmentStatusList.member': parameters.ShipmentStatusList,
        'ShipmentIdList.member': parameters.ShipmentIdList,
        LastUpdatedAfter: parameters.LastUpdatedAfter?.toISOString(),
        LastUpdatedBefore: parameters.LastUpdatedBefore?.toISOString(),
      },
    })

    return ListInboundShipmentsResponse.decode(response).caseOf({
      Right: (x) => [x.ListInboundShipmentsResponse.ListInboundShipmentsResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getBillOfLading(
    parameters: GetBillOfLadingParameters,
  ): Promise<[GetBillOfLading, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'GetBillOfLading',
      parameters: {
        ShipmentId: parameters.ShipmentId,
      },
    })

    return GetBillOfLadingResponse.decode(response).caseOf({
      Right: (x) => [x.GetBillOfLadingResponse.GetBillOfLadingResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getPalletLabels(
    parameters: GetPalletLabelsParameters,
  ): Promise<[GetPalletLabels, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'GetPalletLabels',
      parameters: {
        ShipmentId: parameters.ShipmentId,
        PageType: parameters.PageType,
        NumberOfPallets: parameters.NumberOfPallets,
      },
    })

    return GetPalletLabelsResponse.decode(response).caseOf({
      Right: (x) => [x.GetPalletLabelsResponse.GetPalletLabelsResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getUniquePackageLabels(
    parameters: GetUniquePackageLabelsParameters,
  ): Promise<[GetUniquePackageLabels, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'GetUniquePackageLabels',
      parameters: {
        ShipmentId: parameters.ShipmentId,
        PageType: parameters.PageType,
        'PackageLabelsToPrint.member': parameters.PackageLabelsToPrint,
      },
    })

    return GetUniquePackageLabelsResponse.decode(response).caseOf({
      Right: (x) => [x.GetUniquePackageLabelsResponse.GetUniquePackageLabelsResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getPackageLabels(
    parameters: GetPackageLabelsParameters,
  ): Promise<[GetPackageLabels, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'GetPackageLabels',
      parameters: {
        ShipmentId: parameters.ShipmentId,
        PageType: parameters.PageType,
        NumberOfPackages: parameters.NumberOfPackages,
      },
    })

    return GetPackageLabelsResponse.decode(response).caseOf({
      Right: (x) => [x.GetPackageLabelsResponse.GetPackageLabelsResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async voidTransportRequest(
    parameters: VoidTransportRequestParameters,
  ): Promise<[VoidTransportRequest, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'VoidTransportRequest',
      parameters: {
        ShipmentId: parameters.ShipmentId,
      },
    })

    return VoidTransportRequestResponse.decode(response).caseOf({
      Right: (x) => [x.VoidTransportRequestResponse.VoidTransportRequestResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async confirmTransportRequest(
    parameters: ConfirmTransportRequestParameters,
  ): Promise<[ConfirmTransportRequest, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'ConfirmTransportRequest',
      parameters: {
        ShipmentId: parameters.ShipmentId,
      },
    })

    return ConfirmTransportRequestResponse.decode(response).caseOf({
      Right: (x) => [x.ConfirmTransportRequestResponse.ConfirmTransportRequestResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getTransportContent(
    parameters: GetTransportContentParameters,
  ): Promise<[GetTransportContent, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'GetTransportContent',
      parameters: {
        ShipmentId: parameters.ShipmentId,
      },
    })

    return GetTransportContentResponse.decode(response).caseOf({
      Right: (x) => [x.GetTransportContentResponse.GetTransportContentResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async estimateTransportRequest(
    parameters: EstimateTransportRequestParameters,
  ): Promise<[EstimateTransportRequest, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'EstimateTransportRequest',
      parameters: {
        ShipmentId: parameters.ShipmentId,
      },
    })

    return EstimateTransportRequestResponse.decode(response).caseOf({
      Right: (x) => [x.EstimateTransportRequestResponse.EstimateTransportRequestResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async putTransportContent(
    parameters: PutTransportContentParameters,
  ): Promise<[PutTransportContent, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'PutTransportContent',
      parameters: canonicalizePutTransportContentParameters(parameters),
    })

    return PutTransportContentResponse.decode(response).caseOf({
      Right: (x) => [x.PutTransportContentResponse.PutTransportContentResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getPrepInstructionsForAsin(
    parameters: GetPrepInstructionsForASINParameters,
  ): Promise<[GetPrepInstructionsForASIN, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'GetPrepInstructionsForASIN',
      parameters: {
        'ASINList.Id': parameters.ASINList,
        ShipToCountryCode: parameters.ShipToCountryCode,
      },
    })

    return GetPrepInstructionsForASINResponse.decode(response).caseOf({
      Right: (x) => [x.GetPrepInstructionsForASINResponse.GetPrepInstructionsForASINResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getPrepInstructionsForSku(
    parameters: GetPrepInstructionsForSKUParameters,
  ): Promise<[GetPrepInstructionsForSKU, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'GetPrepInstructionsForSKU',
      parameters: {
        'SellerSKUList.Id': parameters.SellerSKUList,
        ShipToCountryCode: parameters.ShipToCountryCode,
      },
    })

    return GetPrepInstructionsForSKUResponse.decode(response).caseOf({
      Right: (x) => [x.GetPrepInstructionsForSKUResponse.GetPrepInstructionsForSKUResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async confirmPreorder(
    parameters: ConfirmPreorderParameters,
  ): Promise<[ConfirmPreorder, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'ConfirmPreorder',
      parameters: {
        ShipmentId: parameters.ShipmentId,
        NeedByDate: parameters.NeedByDate.toISOString(),
      },
    })

    return ConfirmPreorderResponse.decode(response).caseOf({
      Right: (x) => [x.ConfirmPreorderResponse.ConfirmPreorderResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getPreorderInfo(
    parameters: GetPreorderInfoParameters,
  ): Promise<[GetPreorderInfo, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'GetPreorderInfo',
      parameters: {
        ShipmentId: parameters.ShipmentId,
      },
    })

    return GetPreorderInfoResponse.decode(response).caseOf({
      Right: (x) => [x.GetPreorderInfoResponse.GetPreorderInfoResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

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
