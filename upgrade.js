const fs = require('fs')
const files = fs.readdirSync('dist')
const data = require('unicode-emoji-json')

for (const path of files) {
  const fullPath = `./dist/${path}`
  console.log(`checking ${fullPath}`)
  const content = require(fullPath)

  const notFound = []
  for (const key of Object.keys(data)) {
    if (Object.keys(content).indexOf(key) < 0) {
      notFound.push(key)
      content[key] = [data[key]['name'].replace(/_/, ' '), '// todo']
    }
  }
  const newContent = JSON.stringify(content, null, 2)
  console.log(`added ${notFound.length}: ${notFound.join(', ')}.`)
  fs.writeFileSync(fullPath, newContent)
}
