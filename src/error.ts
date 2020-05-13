/* eslint-disable max-classes-per-file */
import { Codec, exactly, GetInterface, oneOf, optional, string } from 'purify-ts/Codec'
import { ExtendableError } from 'ts-error'

export class MWSError extends ExtendableError {}

export class HttpError extends MWSError {
  public type!: string

  public code!: string

  public detail!: string | undefined

  public mwsMessage!: string

  public requestId!: string
}

export class InputStreamDisconnected extends HttpError {}
export class InvalidParameterValue extends HttpError {}
export class AccessDenied extends HttpError {}
export class InvalidAccessKeyId extends HttpError {}
export class SignatureDoesNotMatch extends HttpError {}
export class InvalidAddress extends HttpError {}
export class InternalError extends HttpError {}
export class QuotaExceeded extends HttpError {}
export class RequestThrottled extends HttpError {}

export class ParsingError extends MWSError {}
/* eslint-enable max-classes-per-file */

export const MWSApiError = Codec.interface({
  ErrorResponse: Codec.interface({
    Error: Codec.interface({
      Type: string,
      Code: oneOf(
        ([
          'InputStreamDisconnected',
          'InvalidParameterValue',
          'AccessDenied',
          'InvalidAccessKeyId',
          'SignatureDoesNotMatch',
          'InvalidAddress',
          'InternalError',
          'QuotaExceeded',
          'RequestThrottled',
        ] as const).map((element) => exactly(element)),
      ),
      Message: string,
      Detail: optional(string),
    }),
    RequestID: optional(string),
    RequestId: optional(string),
  }),
})

type MWSApiError = GetInterface<typeof MWSApiError>

/* eslint-disable no-param-reassign */
export const enhanceError = (error: HttpError, response: MWSApiError): HttpError => {
  error.type = response.ErrorResponse.Error.Type
  error.code = response.ErrorResponse.Error.Code
  error.detail = response.ErrorResponse.Error.Detail
  error.mwsMessage = response.ErrorResponse.Error.Message
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  error.requestId = (response.ErrorResponse.RequestID || response.ErrorResponse.RequestId)!

  return error
}
/* eslint-enable no-param-reassign */
