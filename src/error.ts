/* eslint-disable max-classes-per-file */
import { Codec, GetInterface, optional, string } from 'purify-ts/Codec'
import { ExtendableError } from 'ts-error'

export class MWSError extends ExtendableError {}

export class HttpError extends MWSError {
  public type!: string

  public code!: string

  public detail!: string | undefined

  public mwsMessage!: string

  public requestId!: string
}

export class ParsingError extends MWSError {}
/* eslint-enable max-classes-per-file */

export const MWSApiError = Codec.interface({
  ErrorResponse: Codec.interface({
    Error: Codec.interface({
      Type: string,
      Code: string,
      Message: string,
      Detail: optional(string),
    }),
    RequestId: string,
  }),
})

type MWSApiError = GetInterface<typeof MWSApiError>

/* eslint-disable no-param-reassign */
export const enhanceError = (error: HttpError, response: MWSApiError): HttpError => {
  error.type = response.ErrorResponse.Error.Type
  error.code = response.ErrorResponse.Error.Code
  error.detail = response.ErrorResponse.Error.Detail
  error.mwsMessage = response.ErrorResponse.Error.Message
  error.requestId = response.ErrorResponse.RequestId

  return error
}
/* eslint-enable no-param-reassign */
