import Ajv from 'ajv'
import { number, Right } from 'purify-ts'

import {
  ensureArray,
  mwsBoolean,
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
