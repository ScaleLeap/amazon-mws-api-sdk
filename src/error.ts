/* eslint-disable max-classes-per-file */
export class MWSError extends Error {
  constructor(...parameters: string[]) {
    // Propagate some vendor-specific arguments
    super(...parameters)

    // If someone downlevels the compilation target to es5
    Object.setPrototypeOf(this, MWSError.prototype)

    // Maintains proper stack trace (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MWSError)
    }
  }
}

export class HttpError extends MWSError {
  public message = 'Encountered an error while sending a request'

  constructor(public error: unknown, ...parameters: string[]) {
    super(...parameters)
    Object.setPrototypeOf(this, HttpError.prototype)
  }
}

export class ParsingError extends MWSError {
  public message = 'Encountered an error while parsing a response'

  constructor(public error: string, ...parameters: string[]) {
    super(...parameters)
    Object.setPrototypeOf(this, ParsingError.prototype)
  }
}

export class BadParameterError extends MWSError {
  constructor(public error: string, ...parameters: string[]) {
    super(...parameters)
    Object.setPrototypeOf(this, ParsingError.prototype)
  }
}
/* eslint-enable max-classes-per-file */
