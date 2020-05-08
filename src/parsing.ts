/** A collection of parsing codecs */
import { array, Codec, string } from 'purify-ts/Codec'
import { Left, Right } from 'purify-ts/Either'

export const ensureArray = <T>(codec: Codec<T>): Codec<T[]> => {
  const schema = codec.schema()

  return Codec.custom({
    decode: (x) => {
      const arrayX = Array.isArray(x) ? x : [x]
      return array(codec).decode(arrayX)
    },
    encode: (x) => x,
    schema: () => ({
      oneOf: [schema, { type: 'array', items: [schema], minItems: 1 }],
    }),
  })
}

export const mwsBoolean = Codec.custom<boolean>({
  decode: (x) => {
    switch (x) {
      case 'Yes':
        return Right(true)
      case 'No':
        return Right(false)
      default:
        return Left(
          `Expected a string with a value of either "Yes" or "No", but received a string with value ${JSON.stringify(
            x,
          )}`,
        )
    }
  },
  encode: (x) => x,
  schema: () => ({ type: 'string', enum: ['Yes', 'No'] }),
})

export enum ServiceStatus {
  Green = 'GREEN',
  Yellow = 'YELLOW',
  Red = 'RED',
}

export const serviceStatus = Codec.custom<ServiceStatus>({
  decode: (x) => {
    switch (x) {
      case 'GREEN':
        return Right(ServiceStatus.Green)
      case 'YELLOW':
        return Right(ServiceStatus.Yellow)
      case 'RED':
        return Right(ServiceStatus.Red)
      default:
        return Left(
          `Expected a string with a value of "GREEN", "YELLOW" or "RED", but received a string with value ${JSON.stringify(
            x,
          )}`,
        )
    }
  },
  encode: (x) => x,
  schema: () => ({ type: 'string', enum: ['GREEN', 'YELLOW', 'RED'] }),
})

export class NextToken<T extends string> {
  constructor(private action: T, public token: string) {}
}

export const nextToken = <T extends string>(action: T) =>
  Codec.custom<NextToken<T>>({
    decode: (x) => string.decode(x).map((string_) => new NextToken(action, string_)),
    encode: (x) => x,
    schema: () => ({ type: 'string' }),
  })
