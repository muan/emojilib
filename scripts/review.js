const fs = require('fs')
const lang = process.argv[2]
const promptly = require('promptly')
if (!lang) {
  const files = fs.readdirSync('dist')
  const langs = files.map(tag => tag.match(/-(.+)\./)[1])
  console.log(`Please provide a langage tag: ${langs.join(', ')}`)
} else {
  start()
}

async function start() {
  const path = `dist/emoji-${lang}.json`
  const file = require(`../${path}`)
  for (const emoji in file) {
    const kws = file[emoji]
    const length = kws.length
    console.log(`\n[current] ${emoji}: ${kws.join(', ')}`)
    for (const kw of kws) {
      const answer = await promptly.choose(`Is "${kw}" a suitable keyword for ${emoji}? (y/n/e)`, ['y', 'n', 'e'])
      if (answer === 'n') {
        kws.splice(kws.indexOf(kw), 1)
      } else if (answer === 'e') {
        const newWord = await promptly.prompt(`What should "${kw}" be changed to?`)
        kws.splice(kws.indexOf(kw), 1, newWord)
      }
    }

    if (kws.length !== length) {
      fs.writeFileSync(`./${path}`, JSON.stringify(file, null, 2))
      console.log(`[saved] ${emoji}: ${kws.join(', ')}\n`)
    }
  }
}
