import { number, Right } from 'purify-ts'

import { ensureArray, mwsBoolean } from '../../src/parsing'

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
