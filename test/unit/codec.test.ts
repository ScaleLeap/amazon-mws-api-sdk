import { mwsDate } from '../../src/parsing'

describe('mwsDate', () => {
  /**
   * Adding this test because for some reason git actions fails on dates
   * https://github.com/ScaleLeap/amazon-mws-api-sdk/pull/113/checks?check_run_id=830331398
   */
  it('parses dates correctly', async () => {
    expect.assertions(1)

    const shipDate = '10/16/2018 07:41:12'
    const fromSnapshot = '2018-10-15T23:41:12.000Z' // this is the output of the snapshot
    // const notFromSnapshot = '2018-10-16T07:41:12.000Z' // the output from the test running in git
    const output = mwsDate.decode(shipDate).caseOf({
      Right: (x) => x.toISOString(),
      Left: () => {
        console.log()
      },
    })

    expect(output).toStrictEqual(fromSnapshot)
  })
})
