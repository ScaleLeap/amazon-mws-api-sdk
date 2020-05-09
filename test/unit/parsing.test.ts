import Ajv from 'ajv'
import { date, number, string } from 'purify-ts/Codec'
import { Right } from 'purify-ts/Either'

import {
  ensureArray,
  ensureString,
  mwsBoolean,
  mwsDate,
  NextToken,
  nextToken,
  ServiceStatus,
  serviceStatus,
} from '../../src/parsing'

const ajv = new Ajv()

describe('ensureArray', () => {
  it('just extracts the elements if the value to be decoded is already an array', () => {
    expect.assertions(1)

    expect(ensureArray('A', number).decode({ A: [1] })).toStrictEqual(Right([1]))
  })

  it("extracts the elements and wraps the value to be decoded in an array if it's not already", () => {
    expect.assertions(1)

    expect(ensureArray('A', number).decode({ A: 1 })).toStrictEqual(Right([1]))
  })

  it('handles empty arrays which get deserialized as empty string', () => {
    expect.assertions(1)

    expect(ensureArray('A', number).decode('')).toStrictEqual(Right([]))
  })

  it('has an encode that does nothing', () => {
    expect.assertions(1)

    expect(ensureArray('A', number).encode([1])).toStrictEqual([1])
  })
})

describe('ensureString', () => {
  it('decodes numbers as strings', () => {
    expect.assertions(1)

    expect(ensureString.decode(5)).toStrictEqual(Right('5'))
  })

  it('has the same encode as the string codec', () => {
    expect.assertions(1)

    expect(ensureString.encode).toStrictEqual(string.encode)
  })

  it('generates a valid JSON schema for a string or number', () => {
    expect.assertions(3)

    const schema = ensureString.schema()

    expect(ajv.validate(schema, 'A')).toStrictEqual(true)
    expect(ajv.validate(schema, 5)).toStrictEqual(true)
    expect(ajv.validate(schema, false)).toStrictEqual(false)
  })
})

describe('mwsBoolean', () => {
  it('decodes the string "Yes" as true', () => {
    expect.assertions(1)

    expect(mwsBoolean.decode('Yes')).toStrictEqual(Right(true))
  })

  it('decodes the string "No" as false', () => {
    expect.assertions(1)

    expect(mwsBoolean.decode('No')).toStrictEqual(Right(false))
  })

  it('decodes any other string as a failure', () => {
    expect.assertions(1)

    expect(mwsBoolean.decode('YES')).toMatchSnapshot()
  })

  it('generates a valid JSON schema for an enum', () => {
    expect.assertions(3)

    const schema = mwsBoolean.schema()

    expect(ajv.validate(schema, 'Yes')).toStrictEqual(true)
    expect(ajv.validate(schema, 'No')).toStrictEqual(true)
    expect(ajv.validate(schema, 'YES')).toStrictEqual(false)
  })

  it('has an encode that does nothing', () => {
    expect.assertions(1)

    expect(mwsBoolean.encode(false)).toStrictEqual(false)
  })
})

describe('mwsDate', () => {
  it('is like the date decoder but it handled uri encoded strings', () => {
    expect.assertions(1)

    expect(mwsDate.decode('2017-02-25T18%3A10%3A21.687Z')).toStrictEqual(
      date.decode('2017-02-25T18:10:21.687Z'),
    )
  })

  it('has the same encode as the date codec', () => {
    expect.assertions(1)

    expect(mwsDate.encode).toStrictEqual(date.encode)
  })

  it('has the same schema as the date codec', () => {
    expect.assertions(1)

    expect(mwsDate.schema).toStrictEqual(date.schema)
  })
})

describe('serviceStatus', () => {
  it('decodes the string "GREEN"', () => {
    expect.assertions(1)

    expect(serviceStatus.decode('GREEN')).toStrictEqual(Right(ServiceStatus.Green))
  })

  it('decodes the string "YELLOW"', () => {
    expect.assertions(1)

    expect(serviceStatus.decode('YELLOW')).toStrictEqual(Right(ServiceStatus.Yellow))
  })

  it('decodes the string "RED"', () => {
    expect.assertions(1)

    expect(serviceStatus.decode('RED')).toStrictEqual(Right(ServiceStatus.Red))
  })

  it('decodes any other string as a failure', () => {
    expect.assertions(1)

    expect(serviceStatus.decode('Green')).toMatchSnapshot()
  })

  it('generates a valid JSON schema for an enum', () => {
    expect.assertions(4)

    const schema = serviceStatus.schema()

    expect(ajv.validate(schema, 'YELLOW')).toStrictEqual(true)
    expect(ajv.validate(schema, 'GREEN')).toStrictEqual(true)
    expect(ajv.validate(schema, 'RED')).toStrictEqual(true)
    expect(ajv.validate(schema, 'BLUE')).toStrictEqual(false)
  })

  it('has an encode that does nothing to its argument', () => {
    expect.assertions(1)

    expect(serviceStatus.encode(ServiceStatus.Green)).toStrictEqual(ServiceStatus.Green)
  })
})

describe('nextToken', () => {
  it('is a string parser that constructs a NextToken object', () => {
    expect.assertions(1)

    expect(nextToken('Action').decode('123')).toStrictEqual(Right(new NextToken('Action', '123')))
  })

  it('generates a valid JSON schema', () => {
    expect.assertions(2)

    const schema = nextToken('').schema()

    expect(ajv.validate(schema, 'some string')).toStrictEqual(true)
    expect(ajv.validate(schema, 42)).toStrictEqual(false)
  })

  it('has an encode that does nothing to its argument', () => {
    expect.assertions(1)

    expect(nextToken('').encode(new NextToken('', '123'))).toStrictEqual(new NextToken('', '123'))
  })
})
