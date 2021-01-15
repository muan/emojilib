const fs = require('fs')
const basefilePath = require('../package.json')['main']
const fileContent = require(`../${basefilePath}`)
const lang = process.argv[2]
if (!lang) {
  console.log(
    'Please provide a langage code, which must be made of [primary language subtag]-[region subtag].\nFor example, use en-GB for English within United Kingdom, and use zh-TW for Chinese used in Taiwan.\nSee https://en.wikipedia.org/wiki/IETF_language_tag for more information.'
  )
} else {
  createFile()
}

function createFile() {
  for (const emoji in fileContent) {
    fileContent[emoji] = ['// TODO']
  }
  const fileName = `./dist/emoji-${lang}.json`
  fs.writeFileSync(fileName, JSON.stringify(fileContent, null, 2))
  console.log(`[created] ${fileName} | add keywords with \`npm run improve ${lang}\`.`)
}
