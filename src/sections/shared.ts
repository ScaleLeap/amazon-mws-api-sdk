import { Codec, GetInterface, string } from 'purify-ts/Codec'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { serviceStatus } from '../parsing'

const ServiceStatusResponse = Codec.interface({
  GetServiceStatusResponse: Codec.interface({
    GetServiceStatusResult: Codec.interface({
      Status: serviceStatus,
      Timestamp: string,
    }),
  }),
})

type ServiceStatusResponse = GetInterface<
  typeof ServiceStatusResponse
>['GetServiceStatusResponse']['GetServiceStatusResult']

export const getServiceStatusByResource = async (
  httpClient: HttpClient,
  resource: Resource,
  version: string,
): Promise<[ServiceStatusResponse, RequestMeta]> => {
  const [response, meta] = await httpClient.request('POST', {
    resource,
    version,
    action: 'GetServiceStatus',
    parameters: {},
  })

  return ServiceStatusResponse.decode(response).caseOf({
    Right: (x) => [x.GetServiceStatusResponse.GetServiceStatusResult, meta],
    Left: (error) => {
      throw new ParsingError(error)
    },
  })
}
