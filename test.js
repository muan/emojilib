var fs          = require('fs')
var rawData     = fs.read('emojis.json').toString()
var buildFailed = false
var escapeStr   = require('escape-string-regexp')
var passed      = function() { console.log("\x1B[92mPASSED\x1B[0m\n") }
var failed      = function() {
  console.log("\x1B[91mFAILED\x1B[0m\n")
  buildFailed = true
}
var reveal = function() {
  if(buildFailed) {
    console.log(":cry: \x1B[91mNo good, something failed.\x1B[0m :boom:\n")
    phantom.exit(buildFailed)
  } else {
    console.log(":sparkles: \x1B[96mWho's awesome? You're awesome!\x1B[0m :+1:\n")
    phantom.exit()
  }
}

//
console.log("\nTEST: Correct JSON format")

try {
  var data = JSON.parse(fs.read('emojis.json'))
  var orderd_keys = JSON.parse(fs.read('ordered.json'))
  var keys = Object.keys(data)
  passed()
} catch(e) {
  console.log('Invalid JSON format. See the CONTRIBUTING doc for reference.')
  failed()
  reveal()
}

//
console.log("TEST: Correct number of emojis")

var emojiNumber = 1025 // update this number when emoji are added

if(keys.length !== emojiNumber) {
  console.log("There are " + emojiNumber + " emojis, but emojis.json has " + keys.length + " entries.")
  failed()
} else {
  passed()
}

//
console.log("TEST: Ordered keys are up to date")

if(orderd_keys.length !== emojiNumber) {
  console.log("There are " + emojiNumber + " emojis, but keys contains " + orderd_keys.length + " emojis.")
  failed()
} else {
  passed()
}

//
console.log("TEST: No duplicated entries")

var arr = []
var dups = []
var keysFromRawData = rawData.match(/\".+\": {/g)

keysFromRawData.forEach(function(key) {
  if(arr.indexOf(key) < 0) {
    arr.push(key)
  } else {
    dups.push(key.replace(/\"|\:|\s|\{/g, ""))
  }
})

if(dups.length > 0) {
  dups.forEach(function(key) {
    console.log('There is more than one "' + key + '" in emojis.json.')
  })
  failed()
} else {
  passed()
}

//
console.log("TEST: No unnecessary keywords")

var unnecessities = []
var unnecessitiesInKeywords = []

keys.forEach(function(key) {
  data[key]["keywords"].forEach(function(keyword) {
    keyword = escapeStr(keyword)
    if(key.match(keyword)) {
      unnecessities.push([key, keyword])
    }

    var otherKeywords = data[key]["keywords"].slice()
    otherKeywords.splice(data[key]["keywords"].indexOf(keyword), 1)
    otherKeywords.forEach(function(otherKeyword) {
      if(otherKeyword.match(keyword)) {
        unnecessitiesInKeywords.push([otherKeyword, keyword, key])
      }
    })
  })
})

if(unnecessities.length > 0 || unnecessitiesInKeywords.length > 0) {
  unnecessities.forEach(function(arr) {
    console.log('"' + arr[1] + '" is unnecessary as it is already part of "' + arr[0] + '" and will be matched.')
  })
  unnecessitiesInKeywords.forEach(function(arr) {
    console.log('"' + arr[1] + '" is unnecessary as a "' + arr[2] + '" already has a keyword "' + arr[0] + '".')
  })

  failed()
} else {
  passed()
}

//
console.log("TEST: Line format")

var offenses = []
var lines = rawData.replace(/^{\n([\s\S]*)\n}\n$/, '$1').split("\n")
var baseRegex = '^    "keywords": \\["[^\"]+"(, "[^\"]+")*\\]'
var contentRegex = new RegExp(baseRegex + ',$')
var lastLineRegex = new RegExp(baseRegex + '$')
lines.forEach(function(line, index) {
  if(line.match(/keywords/) && !line.match(contentRegex)) {
    offenses.push(index + 2)
  }
})

if(offenses.length > 0) {
  offenses.forEach(function(lineNo) {
    console.log('Line ' + lineNo + ' has the wrong format.')
  })

  failed()
} else {
  passed()
}

reveal()
