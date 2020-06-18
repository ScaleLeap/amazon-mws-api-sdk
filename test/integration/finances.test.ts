import { Finances } from '../../src'
import { Config } from './config'
import { itci } from './it'

const httpClient = new Config().createHttpClient()

/* eslint-disable jest/no-standalone-expect */
describe(`${Finances.name}`, () => {
  itci('should be able to query service status', async () => {
    expect.assertions(1)

    const finances = new Finances(httpClient)

    const [response] = await finances.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
/* eslint-enable jest/no-standalone-expect */
