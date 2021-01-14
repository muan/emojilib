const fs = require('fs')
const files = fs.readdirSync('dist')
const data = require('unicode-emoji-json')
const promptly = require('promptly')

async function upgrade() {
  for (const path of files) {
    const fullPath = `../dist/${path}`
    console.log(`checking ${fullPath}`)
    const content = require(fullPath)

    const notFound = []
    for (const key of Object.keys(data)) {
      if (Object.keys(content).indexOf(key) < 0) {
        notFound.push(key)
        content[key] = await getKeywords(key, data[key]['name'])
        console.log(`[saved] ${key}: ${content[key].join(', ')}\n`)
        fs.writeFileSync(fullPath, JSON.stringify(content, null, 2))
      }
    }
    if (notFound.length > 0) console.log(`added ${notFound.length}: ${notFound.join(', ')}.`)
  }
}

async function getKeywords(key, name) {
  const keywords = [name.replace(/_/g, ' ')]
  let text = null
  while (text !== '') {
    text = await promptly.prompt(`Enter a keyword for ${key}(${name}), leave it blank to go to the next one.`, {
      retry: false,
      default: ''
    })
    if (text) keywords.push(text)
  }
  return keywords
}

upgrade()
