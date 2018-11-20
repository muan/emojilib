/* global phantom */

var fs = require('fs')
var rawData = fs.readFileSync('./emojis.json').toString()
var test = require('tape')
var passed = function () { console.log('\x1B[92mPASSED\x1B[0m\n') }
var failed = function () {
  console.log('\x1B[91mFAILED\x1B[0m\n')
  buildFailed = true
}
var reveal = function () {
  if (buildFailed) {
    console.log(':cry: \x1B[91mNo good, something failed.\x1B[0m :boom:\n')
    phantom.exit(buildFailed)
  } else {
    console.log(':sparkles: \x1B[96mWho\'s awesome? You\'re awesome!\x1B[0m :+1:\n')
    phantom.exit()
  }
}

var categories = {
  people: 346,
  animals_and_nature: 177,
  food_and_drink: 105,
  activity: 95,
  travel_and_places: 119,
  objects: 202,
  symbols: 274,
  flags: 252
}

// Calculate numbeer of emojis from categories
var numberOfEmojis = Object.keys(categories).map(function (key) { return categories[key] }).reduce(function (a, b) { return a + b })

//
test('Keys match', function(t) {
  data = JSON.parse(fs.readFileSync('emojis.json').toString())
  ordered_keys = JSON.parse(fs.readFileSync('ordered.json').toString())
  keys = Object.keys(data)
  t.ok(keys, 'Valid JSON format')
  t.equal(keys.length, numberOfEmojis, keys.length + '/' + numberOfEmojis +  ' objects in emojis.json')
  t.equal(ordered_keys.length, numberOfEmojis, ordered_keys.length + '/' + numberOfEmojis + ' keys in ordered_keys.json')

  var ordered_keys_not_in_keys = ordered_keys.filter(function(key) { return keys.indexOf(key) < 0})
  t.deepEqual(ordered_keys_not_in_keys, [], 'Keys in emojis.json and ordered.json match')
  t.end()
})

test('Emoji count', function(t) {
  var counter = []
  Object.keys(categories).forEach(function (category) {
    var count = keys.map(function (key) {
      return data[key]['category']
    }).filter(function (mojicategory) {
      return mojicategory === category
    }).length

    if (count !== categories[category]) {
      counter.push([category, count])
    }
  })

  if (counter.length > 0) {
    var emptyCounterMessage = ''
    for (const result of counter) {
      emptyCounterMessage += 'There are ' + result[1] + ' emojis in \'' + result[0] + '\', but the expected number is ' + categories[result[0]] + '\n'
    }
  }
  t.deepEqual(counter, [], emptyCounterMessage || 'OK')
  t.end()
})

test('No duplicate characters', function(t) {
  var arr = []
  var dups = []
  var keysFromRawData = rawData.match(/\".+\": {/g)

  keysFromRawData.forEach(function (key) {
    key = key.replace(/\"|\:|\s|\{/g, '')
    if (arr.indexOf(key) < 0) {
      arr.push(key)
    } else {
      dups.push(key)
    }
  })

  var charsFromRawData = rawData.match(/"char": ".+"/g)

  charsFromRawData.forEach(function (character) {
    character = character.replace(/:|"|(char)|\s/g, '')
    if (arr.indexOf(character) < 0) {
      arr.push(character)
    } else {
      dups.push(character)
    }
  })

  if (dups.length > 0) {
    var noDupsMessage = ''
    for (const key of dups) {
      noDupsMessage += 'There is more than one "' + key + '" in emojis.json.\n'
    }
  }
  t.deepEqual(dups, [], noDupsMessage || 'OK')
  t.end()
})

//
test('No unnecessary keywords', function(t) {
  var unnecessities = []
  var unnecessitiesInKeywords = []

  keys.forEach(function (key) {
    for (const keyword of data[key]['keywords']) {
      if (key === keyword) {
        unnecessities.push([key, keyword])
      }

      var otherKeywords = data[key]['keywords'].slice()
      otherKeywords.splice(data[key]['keywords'].indexOf(keyword), 1)

      otherKeywords.forEach(function (otherKeyword) {
        if (otherKeyword === keyword) {
          unnecessitiesInKeywords.push([otherKeyword, keyword, key])
        }
      })
    }
  })

  if (unnecessities.length > 0 || unnecessitiesInKeywords.length > 0) {
    var unnecessitiesMessage = ''
    for (const arr of unnecessities) {
      unnecessitiesMessage += '"' + arr[1] + '" is unnecessary as the key is already "' + arr[0] + '".\n'
    }
    var unnecessitiesInKeywordsMessage = ''
    for (const arr of unnecessitiesInKeywords) {
      unnecessitiesInKeywordsMessage += '"' + arr[1] + '" is unnecessary as a "' + arr[2] + '" already has a keyword "' + arr[0] + '".\n'
    }
  }
  t.deepEqual(unnecessities, [], unnecessitiesMessage || 'OK')
  t.deepEqual(unnecessitiesInKeywords, [], unnecessitiesInKeywordsMessage || 'OK')
  t.end()
})

//
test('Required properties', function(t) {
  var properties = ['keywords', 'char', 'fitzpatrick_scale', 'category']
  var emojiWithWrongKeys = []
  keys.forEach(function (key) {
    if (Object.keys(data[key]).join() !== properties.join()) {
      emojiWithWrongKeys.push(key)
    }
  })

  if (emojiWithWrongKeys.length > 0) {
    var message = ''
    for (const emoji of emojiWithWrongKeys) {
      message += emoji + ' has keys "' + Object.keys(data[emoji]).join(', ') + '", expect: "' + properties.join(', ') + '"\n'
    }
  }
  t.deepEqual(emojiWithWrongKeys, [], message || 'OK')
  t.end()
})
