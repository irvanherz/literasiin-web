const fs = require('fs')
const path = require('path');
const en = require('../langs/en.json')
const id = require('../langs/id.json')

const newEntries = {}
const entries = Object.entries(en)

for (const entry of entries) {
  const key = entry[0]
  const value = entry[1]
  if (!id[key]) {
    newEntries[key] = value
  }
}

const diffFile = path.resolve(path.join(__dirname, '../langs/diff.json'))
fs.writeFileSync(diffFile, JSON.stringify(newEntries), { encoding: 'utf-8' })