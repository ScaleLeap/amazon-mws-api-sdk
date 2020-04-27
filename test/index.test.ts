import { helloWorld } from '../src/index'

test('should pass', () => {
  expect(helloWorld()).toBe('hello world')
})
