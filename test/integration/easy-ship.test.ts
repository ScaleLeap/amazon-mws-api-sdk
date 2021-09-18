import { EasyShip } from '../../src'
import { Config } from './config'

const httpClient = new Config().createHttpClient()

describe(`${EasyShip.name}`, () => {
  it('should be able to query service status', async () => {
    expect.assertions(1)

    const easyShip = new EasyShip(httpClient)

    const [response] = await easyShip.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
