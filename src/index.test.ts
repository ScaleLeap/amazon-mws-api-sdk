import { helloWorld } from '.'

describe('integration', () => {
  it('should pass', () => {
    expect.assertions(1)

    expect(helloWorld()).toBe('hello world')
  })
})
