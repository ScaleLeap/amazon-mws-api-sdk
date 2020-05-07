import { number, Right } from 'purify-ts'

import { ensureArray, mwsBoolean, ServiceStatus, serviceStatus } from '../../src/parsing'

describe('ensureArray', () => {
  it('acts like an idenity if the value to be decoded is already an array', () => {
    expect.assertions(1)

    expect(ensureArray(number).decode([1])).toStrictEqual(Right([1]))
  })

  it("wraps the value to be decoded in an array if it's not already", () => {
    expect.assertions(1)

    expect(ensureArray(number).decode(1)).toStrictEqual(Right([1]))
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
})
