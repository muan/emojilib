var fs = require('fs')
var path = require('path')
var JSONStream = require('JSONStream')
var format = require('format-json-stream')

var cnEmojis = fs.createWriteStream(path.join(__dirname, 'emojis.json'))

fs.readFile(path.join(__dirname, 'emoji_words.json'), 'utf8', (err, data) => {
  if (err) throw err;
  var emojiCnWords = JSON.parse(data)
  fs.createReadStream(path.join(__dirname, '../emojis.json'))
  .pipe(JSONStream.parse('*', function (val, key) {
    if (val.char) {
      var words = emojiCnWords[val.char]
      if (words) {
        val.keywords.push.apply(val.keywords, words)
      }
    }
    return [key[0], val]
  }))
  .pipe(JSONStream.stringifyObject())
  .pipe(format())
  .pipe(cnEmojis)
});