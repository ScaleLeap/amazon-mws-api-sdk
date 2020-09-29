import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

function changeName(file: string) {
  const path = join(__dirname, '../', file)
  const content = JSON.parse(readFileSync(path, { encoding: 'utf8' }))
  Object.assign(content, { name: 'mws' })
  writeFileSync(path, JSON.stringify(content, undefined, 2), { encoding: 'utf8' })
}

changeName('package.json')
changeName('package-lock.json')
