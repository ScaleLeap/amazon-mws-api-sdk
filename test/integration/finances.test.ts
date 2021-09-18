import { Finances } from '../../src'
import { Config } from './config'

const httpClient = new Config().createHttpClient()

/* eslint-disable jest/no-standalone-expect */
describe(`${Finances.name}`, () => {
  const finances = new Finances(httpClient)
  const validDate = new Date(Date.now() - 150 * 24 * 60 * 60 * 1000) // Date from 150 days ago

  it('list financial event groups should post succesfully with a basic request', async () => {
    expect.assertions(1)

    const [response] = await finances.listFinancialEventGroups({
      FinancialEventGroupStartedAfter: validDate,
    })

    expect(response).toBeDefined()
  })

  it('list financial events should post succesfully with a basic request', async () => {
    expect.assertions(1)

    const [response] = await finances.listFinancialEvents({
      PostedAfter: validDate,
    })

    expect(response).toBeDefined()
  })

  it('should be able to query service status', async () => {
    expect.assertions(1)

    const [response] = await finances.getServiceStatus()

    expect(response.Status).toMatch(/GREEN|YELLOW|RED/)
  })
})
/* eslint-enable jest/no-standalone-expect */
