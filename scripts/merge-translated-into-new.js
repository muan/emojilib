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

if (!languageTagRegex().test(locale)) {
  console.error('Locale must match the IETF language tag standard. See: https://en.wikipedia.org/wiki/IETF_language_tag')
  process.exit(1)
}

if (!sourceFilePath || sourceFilePath.length === 0) {
  console.error('Source file missing.')
  process.exit(1)
}

const distFilePath = path.resolve(__dirname, '..', 'lib', `locales-${locale}.json`)
const translatedEmojis = require(sourceFilePath)
const keywordsMap = {}
const categoryMap = {}
Object.keys(translatedEmojis).forEach((name) => {
  // Warn user if emoji does not exist in source of truth emojis.json
  if (!emojis.hasOwnProperty(name)) {
    console.error(`🚨: Emoji ${name} is not present in emojis.json`)
    return
  }

  const origEmoji = emojis[name]
  const translatedEmoji = translatedEmojis[name]

  // Grab translated category
  categoryMap[origEmoji.category] = translatedEmoji.category

  // Assume that the order of keywords are kept
  if (origEmoji.keywords.length > translatedEmoji.keywords.length) {
    console.error(`🚨: Translated emoji ${name} (${origEmoji.char} ) has less keywords as original in emojis.json`)
    return
  }

  origEmoji.keywords.forEach((keyword, index) => {
    keywordsMap[keyword] = translatedEmoji.keywords[index]
  })
})

// Sort categories to easy up manual editing
const sortedCategoryMap = Object.keys(categoryMap).sort().reduce((categories, category) => {
  return Object.assign(categories, {
    [category]: categoryMap[category]
  })
}, {})

// Sort keywords to easy up manual editing
const sortedKeywordsMap = Object.keys(keywordsMap).sort().reduce((keywords, keyword) => {
  return Object.assign(keywords, {
    [keyword]: keywordsMap[keyword]
  })
}, {})

const localizedData = {
  categories: sortedCategoryMap,
  keywords: sortedKeywordsMap
}

// Create JSON with single line keywords array
const localeJSON = JSON.stringify(localizedData, null, 2)
.replace(/\[[^\]]*\]/g, (value) => {
  // remove tabs and line breaks while reducing multiple spaces to a single one
  return value.replace(/[\t\n\r]+/g, '')
    .replace(/ +/g, ' ')
})

fs.writeFile(distFilePath, localeJSON, () => {
  console.log(`Finished creating lib/locales-${locale}.json`)
})
