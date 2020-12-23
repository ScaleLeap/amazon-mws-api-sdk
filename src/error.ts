/* eslint-disable max-classes-per-file */
import { GetType } from 'purify-ts'
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
export class InputStreamDisconnectedError extends HttpError {}
export class InvalidParameterValueError extends HttpError {}
export class AccessDeniedError extends HttpError {}
export class InvalidAccessKeyIdError extends HttpError {}
export class SignatureDoesNotMatchError extends HttpError {}
export class InvalidAddressError extends HttpError {}
export class InternalErrorError extends HttpError {}
export class QuotaExceededError extends HttpError {}
export class RequestThrottledError extends HttpError {}
// Easy Ship errors
export class ResourceNotFoundError extends HttpError {}
export class ScheduledPackageAlreadyExistsError extends HttpError {}
export class RegionNotSupportedError extends HttpError {}
export class ScheduleWindowExpiredError extends HttpError {}
export class InvalidOrderStateError extends HttpError {}
export class PickupSlotNotAvailableError extends HttpError {}
// Feeds errors
export class AccessToFeedProcessingResultDeniedError extends HttpError {}
export class ContentMD5MissingError extends HttpError {}
export class ContentMD5DoesNotMatchError extends HttpError {}
export class FeedCanceledError extends HttpError {}
export class FeedProcessingResultNoLongerAvailableError extends HttpError {}
export class FeedProcessingResultNotReadyError extends HttpError {}
export class InputDataErrorError extends HttpError {}
export class InvalidFeedSubmissionIdError extends HttpError {}
export class InvalidFeedTypeError extends HttpError {}
export class InvalidRequestError extends HttpError {}
// Finances errors
export class NonRetriableInternalErrorError extends HttpError {}
export class RetriableInternalErrorError extends HttpError {}
// Products errors
export class InvalidUPCIdentifierError extends HttpError {}
// Reports errors
export class AccessToReportDeniedError extends HttpError {}
export class InvalidReportIdError extends HttpError {}
export class InvalidReportRequestIdError extends HttpError {}
export class InvalidReportTypeError extends HttpError {}
export class InvalidScheduleFrequencyError extends HttpError {}
export class ReportNoLongerAvailableError extends HttpError {}
export class ReportNotReadyError extends HttpError {}
// Subscriptions errors
export class DependencyFatalExceptionError extends HttpError {}
export class DependencyRetriableExceptionError extends HttpError {}
export class DependencyUnauthorizedExceptionError extends HttpError {}
export class InternalErrorFatalExceptionError extends HttpError {}
export class InvalidInputFatalExceptionError extends HttpError {}

export class ParsingError extends MWSError {}
/* eslint-enable max-classes-per-file */

type MWSApiError = GetType<typeof MWSApiError>

export const enhanceError = (error: HttpError, response: MWSApiError): HttpError =>
  Object.assign(error, {
    type: response.ErrorResponse.Error.Type,
    code: response.ErrorResponse.Error.Code,
    detail: response.ErrorResponse.Error.Detail,
    mwsMessage: response.ErrorResponse.Error.Message,
    requestId: response.ErrorResponse.RequestID || response.ErrorResponse.RequestId || '',
  } as HttpError)
