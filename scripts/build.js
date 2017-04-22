const fs = require('fs')
const fsExtra = require('fs-extra')
const path = require('path')
const emojis = require('../lib/emojis')
const ordered = require('../lib/ordered')
const dist = path.resolve(__dirname, '..', 'dist')

// Create a simple map for easier and bandwith saving usage
const simplemap = Object.keys(emojis).reduce((map, name) => {
  map[name] = emojis[name].char
  return map
}, {})

// Loop over all emojis and create a copy for every keyword translation they have.
// This will split them up into separate files with only one language per file.
const localizedEmojis = Object.keys(emojis).reduce((localizedEmojis, name) => {
  const emoji = emojis[name]
  const emojiKeywordLocales = Object.keys(emoji.keywords)
  emojiKeywordLocales.forEach((emojiLocale) => {
    // Create a copy which contains keywords only for the given emojiLocale
    const localizedEmoji = Object.assign({}, emoji, {
      keywords: emoji.keywords[emojiLocale]
    })

    if (!localizedEmojis.hasOwnProperty(emojiLocale)) {
      localizedEmojis[emojiLocale] = {}
    }

    // And attach it to the fooBar map
    localizedEmojis[emojiLocale][name] = localizedEmoji
  })

  return localizedEmojis
}, {})

// Create config data and metadata
const config = {
  ordered,
  simplemap,
  locales: Object.keys(localizedEmojis)
}

// Create one emoji file per language
Object.keys(localizedEmojis).forEach((locale) => {
  const filename = `emojis-${locale}.json`
  const json = JSON.stringify(localizedEmojis[locale], null, 2)
  fs.writeFile(path.resolve(dist, filename), json, (err) => {
    if (err) {
      console.error(`Failed to write ${filename}`)
      console.error(err)
      return
    }
    console.log(`Finished writing ${filename}`)
  })
})

// Write fully localized emojis file
const localizedJson = JSON.stringify(emojis, null, 2)
fs.writeFile(path.resolve(dist, 'emojis-localized.json'), localizedJson, (err) => {
  if (err) {
    console.error('Failed to write emojis-localized.json')
    console.error(err)
    return
  }
  console.log('Finished writing emojis-localized.json')
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
