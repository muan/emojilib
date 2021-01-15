const fs = require('fs')
const test = require('tape')
const files = fs.readdirSync('dist')
const expectedKeys = require('unicode-emoji-json/data-ordered-emoji.json')

for (const path of files) {
  test(`checking dist/${path}`, {objectPrintDepth: 1}, t => {
    const content = require(`../dist/${path}`)
    const containedKeys = Object.keys(content)
    t.equal(
      containedKeys.length,
      expectedKeys.length,
      `expected ${expectedKeys.length}, but got ${containedKeys.length}.`
    )
    const notFound = []
    for (const key of expectedKeys) {
      if (!content[key]) {
        notFound.push(key)
      }
    }
    t.ok(notFound.length === 0, `${notFound.join(', ')} were not found.`)
    t.end()
  })
}
