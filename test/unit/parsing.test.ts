import { ensureArray, parseBoolean } from '../../src/parsing'

describe('ensureArray', () => {
  it('returns the same reference if the argument is already an array', () => {
    expect.assertions(1)

    const array = [1]

    expect(ensureArray(array)).toBe(array)
  })

  it('returns the argument wrapped in an array if its not an array', () => {
    expect.assertions(2)

    const value = {}

    expect(ensureArray(value)).toStrictEqual([{}])
    expect(ensureArray(value)[0]).toBe(value)
  })
})

describe('parseBoolean', () => {
  it('returns true if the argument is the string "Yes"', () => {
    expect.assertions(1)

    expect(parseBoolean('Yes')).toStrictEqual(true)
  })

  it('returns false if the argument is the string "No"', () => {
    expect.assertions(1)

    expect(parseBoolean('No')).toStrictEqual(false)
  })

  it('throws an exception if the argument is a string other than "Yes" and "No"', () => {
    expect.assertions(1)

    expect(() => parseBoolean('Something else' as never)).toThrowErrorMatchingSnapshot()
  })
})
