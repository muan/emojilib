const fs = require('fs')
const fsExtra = require('fs-extra')
const path = require('path')
const emojis = require('../lib/emojis')
const ordered = require('../lib/ordered')
const lib = path.resolve(__dirname, '..', 'lib')
const dist = path.resolve(__dirname, '..', 'dist')
const localeRegex = /^locales-(.*)\.json/

// Create a simple map for easier and bandwith saving usage
console.log('Creating simplemap...')
const simplemap = Object.keys(emojis).reduce((map, name) => {
  map[name] = emojis[name].char
  return map
}, {})

// Find and parse locale files
console.log('Locating and parsing translation files...')
const localeMap = fs.readdirSync(lib)
.filter((fileName) => fileName.match(localeRegex))
.reduce((files, fileName) => {
  const matches = localeRegex.exec(fileName)
  const filePath = path.resolve(lib, fileName)
  const content = fs.readFileSync(filePath)
  files[matches[1]] = JSON.parse(content)
  return files
}, {})

// Create config data and metadata
const config = {
  ordered,
  simplemap,
  locales: Object.keys(localeMap)
}

// Create one emoji file per language
Object.keys(localeMap).forEach((locale) => {
  const filename = `emojis-${locale}.json`
  const localeData = localeMap[locale]
  const localizedEmojis = Object.keys(emojis).reduce((localizedEmojis, emojiName) => {
    const emoji = emojis[emojiName]
    // Translate category when possible, english as fallback
    if (localeData.categories.hasOwnProperty(emoji.category)) {
      emoji.category = localeData.categories[emoji.category]
    }

    // Translate keywords when possible, english as fallback
    emoji.keywords = emoji.keywords.map((keyword) => {
      if (localeData.keywords.hasOwnProperty(keyword)) {
        console.log('translated ' + keyword + ' to ' + localeData.keywords[keyword])
        return localeData.keywords[keyword]
      }
      return keyword
    })
    localizedEmojis[emojiName] = emoji
    return localizedEmojis
  }, {})

  const localizedJSON = JSON.stringify(localizedEmojis, null, 2)
  fs.writeFile(path.resolve(dist, filename), localizedJSON, (err) => {
    if (err) {
      console.error(`Failed to write ${filename}`)
      console.error(err)
      return
    }
    console.log(`Finished writing ${filename}`)
  })
})

const configJson = JSON.stringify(config, null, 2)
fs.writeFile(path.resolve(dist, 'config.json'), configJson, (err) => {
  if (err) {
    console.error('Failed to write config.json')
    console.error(err)
    return
  }
  console.log('Finished writing config.json')
})

// Finally copy index.js, with babel we could skip this step
fsExtra.copy(path.resolve(__dirname, '..', 'lib', 'index.js'), path.resolve(dist, 'index.js'), (err) => {
  if (err) {
    console.error('Failed to write index.js')
    console.error(err)
    return
  }
  console.log('Finished copying index.js')
})
