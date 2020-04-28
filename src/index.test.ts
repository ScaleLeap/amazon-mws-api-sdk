import { helloWorld } from './index'

test('should pass', () => {
  expect(helloWorld()).toBe('hello world')
})
