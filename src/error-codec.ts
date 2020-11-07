import { Codec, exactly, oneOf, optional, string } from 'purify-ts/Codec'

export enum CodeEnum {
  InputStreamDisconnected,
  InvalidParameterValue,
  AccessDenied,
  InvalidAccessKeyId,
  SignatureDoesNotMatch,
  InvalidAddress,
  InternalError,
  'Internal Error',
  QuotaExceeded,
  RequestThrottled,
  ResourceNotFound,
  ScheduledPackageAlreadyExists,
  RegionNotSupported,
  ScheduleWindowExpired,
  InvalidOrderState,
  PickupSlotNotAvailable,
  AccessToFeedProcessingResultDenied,
  ContentMD5Missing,
  ContentMD5DoesNotMatch,
  FeedCanceled,
  FeedProcessingResultNoLongerAvailable,
  FeedProcessingResultNotReady,
  InputDataError,
  InvalidFeedSubmissionId,
  InvalidFeedType,
  InvalidRequest,
  NonRetriableInternalError,
  RetriableInternalError,
  AccessToReportDenied,
  InvalidReportId,
  InvalidReportRequestId,
  InvalidReportType,
  InvalidScheduleFrequency,
  ReportNoLongerAvailable,
  ReportNotReady,
  DependencyFatalException,
  DependencyRetriableException,
  DependencyUnauthorizedException,
  InternalErrorFatalException,
  InvalidInputFatalException,
}

export const Error = Codec.interface({
  Type: string,
  Code: oneOf(Object.keys(CodeEnum).map((x) => exactly(x)) as [Codec<string>, ...Codec<string>[]]),
  Message: string,
  Detail: optional(string),
})

export const MWSApiError = Codec.interface({
  ErrorResponse: Codec.interface({
    Error,
    RequestID: optional(string),
    RequestId: optional(string),
  }),
})
