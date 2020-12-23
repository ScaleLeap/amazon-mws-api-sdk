const eslint = require('@scaleleap/utils/eslint')

const ts = eslint.overrides.find((o) => o.files.find((f) => f.endsWith('.ts')))

ts.rules['@typescript-eslint/explicit-module-boundary-types'] = ['off']

module.exports = eslint
