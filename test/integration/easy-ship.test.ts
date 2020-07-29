import { EasyShip } from '../../src'
import { Config } from './config'
import { itci } from './it'

const httpClient = new Config().createHttpClient()

/* eslint-disable jest/no-standalone-expect */
describe(`${EasyShip.name}`, () => {
  itci('should be able to query service status', async () => {
    expect.assertions(1)

    const easyShip = new EasyShip(httpClient)

    const [response] = await easyShip.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
/* eslint-enable jest/no-standalone-expect */
