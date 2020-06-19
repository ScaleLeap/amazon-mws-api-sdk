import { Finances } from '../../src'
import { Config } from './config'
import { itci } from './it'

const httpClient = new Config().createHttpClient()

/* eslint-disable jest/no-standalone-expect */
describe(`${Finances.name}`, () => {
  const finances = new Finances(httpClient)
  itci('list financial event groups should post succesfully with a basic request', async () => {
    expect.assertions(1)

    const [response] = await finances.listFinancialEventGroups({
      FinancialEventGroupStartedAfter: new Date('2018/01/01'),
    })

    expect(response).toBeDefined()
  })

  itci('list financial events should post succesfully with a basic request', async () => {
    expect.assertions(1)

    const [response] = await finances.listFinancialEvents({
      PostedAfter: new Date('2018/01/01'),
    })

    expect(response).toBeDefined()
  })

  itci('should be able to query service status', async () => {
    expect.assertions(1)

    const [response] = await finances.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
/* eslint-enable jest/no-standalone-expect */
