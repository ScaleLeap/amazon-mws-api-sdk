import { promises as fs } from 'fs'

import { parseResponse } from '../../../../src/http'

describe('issue #327', () => {
  it('should parse report response correctly', async () => {
    expect.assertions(1)

    const response = await fs.readFile(`${__dirname}/response.xml`, { encoding: 'utf8' })

    const [data] = parseResponse({
      data: response,
      headers: {},
    })

    expect(data).toMatchSnapshot()
  })
})
