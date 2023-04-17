const fs = require('fs')
const path = require('path');
const diff = require('../langs/diff.json')
const id = require('../langs/id.json')

const merged = { ...id, ...diff }
const idFile = path.resolve(path.join(__dirname, '../langs/id.json'))
fs.writeFileSync(idFile, JSON.stringify(merged), { encoding: 'utf-8' })