const fs = require('fs')
const https = require('https')
const VARIATION_16 = String.fromCodePoint(0xfe0f)
const basefilePath = require('../package.json')['main']

const lang = process.argv[2]
const cldrLang = process.argv[3]

if (!lang || !lang.match(/-/)) {
  console.log(
    'Please provide a langage code, which must be made of [primary language subtag]-[region subtag].\nFor example, use en-GB for English within United Kingdom, and use zh-TW for Chinese used in Taiwan.\nSee https://en.wikipedia.org/wiki/IETF_language_tag for more information.'
  )
} else if (!cldrLang) {
  // validate lang
  const directoryEndpoint = `https://api.github.com/repos/unicode-org/cldr-staging/contents/production/common/annotations`
  https.get(directoryEndpoint, {headers: {'User-Agent': 'muan/emojilib#i18n'}}, function(response) {
    let chunk = ''
    response.on('data', data => (chunk += data))
    response.on('end', () => {
      const langs = JSON.parse(chunk).map(g => g.name.split('.')[0])
      console.log(`CLDR lang required.\nOptions: ${langs.join(', ')}`)
    })
  })
} else {
  createFileFromCldr()
}

function createFileFromCldr() {
  const url = `https://api.github.com/repos/unicode-org/cldr-staging/contents/production/common/annotations/${cldrLang}.xml`
  https.get(url, {headers: {'User-Agent': 'muan/emojilib#i18n'}}, function(response) {
    let chunk = ''
    response.on('data', data => (chunk += data))
    response.on('end', () => {
      const fileContent = Buffer.from(JSON.parse(chunk).content, 'base64')
      const content = parse(fileContent)

      const fileName = `./dist/emoji-${lang}.json`
      fs.writeFileSync(fileName, JSON.stringify(content, null, 2))
      console.log(`[created] ${fileName} | add keywords with \`npm run improve ${lang}\`.`)
    })
  })
}

function parse(content) {
  const parser = require('xml2json')
  const data = require(`../${basefilePath}`)
  Object.keys(data).forEach(k => (data[k] = []))
  
  for (const group of JSON.parse(parser.toJson(content)).ldml.annotations.annotation) {
    const emoji = group.cp
    const emojiWithOptionalVariation16 = data[emoji] ? emoji : emoji + VARIATION_16
    if (!data[emojiWithOptionalVariation16]) continue

    if (group.type === 'tts') {
      if (!data[emojiWithOptionalVariation16].includes(group['$t'])) {
        data[emojiWithOptionalVariation16].splice(0, 0, group['$t'])
      }
    } else {
      const kws = group['$t'].split(' | ')
      data[emojiWithOptionalVariation16] = data[emojiWithOptionalVariation16].concat(kws)
    }
  }
  return data
}
