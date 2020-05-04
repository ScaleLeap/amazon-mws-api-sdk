/** A collection of parsing codecs */
import { array, Codec } from 'purify-ts/Codec'
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
        return Left('TODO, but should be library-specific error')
    }
  },
  encode: (x) => x,
  schema: () => ({ type: 'string', enum: ['Yes', 'No'] }),
})
