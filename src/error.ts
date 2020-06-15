/* eslint-disable max-classes-per-file */
import { GetInterface } from 'purify-ts/Codec'
import { ExtendableError } from 'ts-error'

import { MWSApiError } from './error-codec'

export class MWSError extends ExtendableError {}

export class HttpError extends MWSError {
  public type!: string

  public code!: string

  public detail!: string | undefined

  public mwsMessage!: string

  public requestId!: string
}

// General errors
export class InputStreamDisconnected extends HttpError {}
export class InvalidParameterValue extends HttpError {}
export class AccessDenied extends HttpError {}
export class InvalidAccessKeyId extends HttpError {}
export class SignatureDoesNotMatch extends HttpError {}
export class InvalidAddress extends HttpError {}
export class InternalError extends HttpError {}
export class QuotaExceeded extends HttpError {}
export class RequestThrottled extends HttpError {}
// Easy Ship errors
export class ResourceNotFound extends HttpError {}
export class ScheduledPackageAlreadyExists extends HttpError {}
export class RegionNotSupported extends HttpError {}
export class ScheduleWindowExpired extends HttpError {}
export class InvalidOrderState extends HttpError {}
export class PickupSlotNotAvailable extends HttpError {}
// Feeds errors
export class AccessToFeedProcessingResultDenied extends HttpError {}
export class ContentMD5Missing extends HttpError {}
export class ContentMD5DoesNotMatch extends HttpError {}
export class FeedCanceled extends HttpError {}
export class FeedProcessingResultNoLongerAvailable extends HttpError {}
export class FeedProcessingResultNotReady extends HttpError {}
export class InputDataError extends HttpError {}
export class InvalidFeedSubmissionId extends HttpError {}
export class InvalidFeedType extends HttpError {}
export class InvalidRequest extends HttpError {}
// Finances errors
export class NonRetriableInternalError extends HttpError {}
export class RetriableInternalError extends HttpError {}
// Products errors
export class InvalidUPCIdentifier extends HttpError {}
// Reports errors
export class AccessToReportDenied extends HttpError {}
export class InvalidReportId extends HttpError {}
export class InvalidReportRequestId extends HttpError {}
export class InvalidReportType extends HttpError {}
export class InvalidScheduleFrequency extends HttpError {}
export class ReportNoLongerAvailable extends HttpError {}
export class ReportNotReady extends HttpError {}
// Subscriptions errors
export class DependencyFatalException extends HttpError {}
export class DependencyRetriableException extends HttpError {}
export class DependencyUnauthorizedException extends HttpError {}
export class InternalErrorFatalException extends HttpError {}
export class InvalidInputFatalException extends HttpError {}

export class ParsingError extends MWSError {}
/* eslint-enable max-classes-per-file */

type MWSApiError = GetInterface<typeof MWSApiError>

export const enhanceError = (error: HttpError, response: MWSApiError): HttpError => {
  return Object.assign(error, {
    type: response.ErrorResponse.Error.Type,
    code: response.ErrorResponse.Error.Code,
    detail: response.ErrorResponse.Error.Detail,
    mwsMessage: response.ErrorResponse.Error.Message,
    requestId: response.ErrorResponse.RequestID || response.ErrorResponse.RequestId || '',
  } as HttpError)
}
