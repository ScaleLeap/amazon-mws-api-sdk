import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fetch } from 'cross-fetch'

// https://stackoverflow.com/questions/8931175/where-are-the-specifications-xsds-for-amazon-mws-feed-xml-processing-reports

// https://images-na.ssl-images-amazon.com/images/G/01/rainier/help/xsd/release_1_9/OrderReport.xsd

const BASE_DIR = join(__dirname, '../xsd/')
const BASE_URL = 'https://images-na.ssl-images-amazon.com/images/G/01/rainier/help/xsd/release_4_1/'
const SCHEMA_LOCATION_REGEX = new RegExp('<xsd:include schemaLocation="([^"]+)"', 'gm')
const fetched = new Map()

async function download(filename: string) {
  const res = await fetch(`${BASE_URL}/${filename}`)

  return await res.text()
}

function extractSchemaLocations(xml: string) {
  return [...xml.matchAll(SCHEMA_LOCATION_REGEX)].map((match) => match[1])
}

async function get(filename: string): Promise<boolean> {
  console.debug('Getting file: %s', filename)

  const filePath = join(BASE_DIR, filename)

  if (fetched.get(filePath)) {
    console.debug('>> File %s already fecthed. Skipping...')
    return false
  }

  const res = await download(filename)
  const dir = dirname(filename)

  if (dir !== '.') {
    mkdirSync(join(BASE_DIR, dir), {
      recursive: true,
    })
  }

  writeFileSync(filePath, res, { encoding: 'utf8' })

  fetched.set(filePath, true)

  const extractedSchemaLocations = extractSchemaLocations(res)

  if (extractedSchemaLocations.length > 0) {
    await Promise.all(extractedSchemaLocations.map((f) => get(f)))
  }

  return true
}

async function main() {
  return get('amzn-envelope.xsd')
}

main()
