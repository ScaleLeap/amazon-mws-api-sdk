import { readFileSync } from 'fs'
import { join } from 'path'

export const getFixture = (filename: string): string =>
  readFileSync(join(__dirname, `unit/__fixtures__/${filename}.xml`), { encoding: 'utf8' })
