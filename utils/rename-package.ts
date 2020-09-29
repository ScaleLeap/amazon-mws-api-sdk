import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

import { name } from '../package.json'

const NEW_NAME = 'mws'

function changeName(file: string) {
  const path = join(__dirname, '../', file)
  let content = readFileSync(path, { encoding: 'utf8' })
  content = content.split(name).join(NEW_NAME)
  writeFileSync(path, content, { encoding: 'utf8' })
}

changeName('package.json')
changeName('package-lock.json')
changeName('README.md')
