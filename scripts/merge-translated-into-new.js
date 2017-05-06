// This is a helper file, transforming translated emojis.json files into the new format
// It automatically updates and overwrites the old lib file.
//
// Parameters:
// * path to file to merge into lib
// * locale for file. Has to meet the IETF language tag standard
// Example usage:
// npm run transform ./emojis-de.json de

const fs = require('fs')
const path = require('path')
const languageTagRegex = require('ietf-language-tag-regex')
const emojis = require('../lib/emojis')

const sourceFilePath = path.resolve(process.argv[2])
const locale = process.argv[3]
const distFilePath = path.resolve(__dirname, '..', 'lib', 'emojis.json')

if (!languageTagRegex().test(locale)) {
  console.error('Locale must match the IETF language tag standard. See: https://en.wikipedia.org/wiki/IETF_language_tag')
  process.exit(1)
}

if (!sourceFilePath || sourceFilePath.length === 0) {
  console.error('Source file missing.')
  process.exit(1)
}

const newEmojis = require(sourceFilePath)

Object.keys(newEmojis).forEach((name) => {
  // Add emoji if it does not exist in emojilib
  if (!emojis.hasOwnProperty(name)) {
    emojis[name] = newEmojis[name]
  }

  const newKeywords = newEmojis[name].keywords
  if (Array.isArray(emojis[name].keywords)) {
    // Transform untranslated keywords into localized
    emojis[name].keywords = {
      [locale]: newKeywords
    }
  } else {
    // Or attach keywords to translated keywords
    if (!emojis.hasOwnProperty(name)) {
      console.error('Emoji ' + name + ' does not exist in library.')
      return
    }
    emojis[name].keywords[locale] = newKeywords
  }
})

fs.writeFile(distFilePath, JSON.stringify(emojis, (value) => {
  if (Array.isArray(value)) {
    return JSON.stringify(value, null, 0)
  }
  return JSON.stringify(value, null, 2)
}, 2), () => {
  console.log('Finished')
})
