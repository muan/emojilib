var execSync = require('child_process').execSync;
var fs = require("fs");
var fr = require('file-str-replace');

var emojis = require("../emojis.json");

// http://stackoverflow.com/a/3579651/237209
function sortByFrequencyAndRemoveDuplicates(array) {
    var frequency = {}, value;

    for(var i = 0; i < array.length; i++) {
        value = array[i];
        if(value in frequency) {
            frequency[value]++;
        }
        else {
            frequency[value] = 1;
        }
    }

    var uniques = [];
    for(value in frequency) {
        uniques.push(value);
    }

    function compareFrequency(a, b) {
        return frequency[b] - frequency[a];
    }

    return uniques.sort(compareFrequency);
}

function getKeywords() {
  var arr = [];

  for(var key in emojis) {
    arr = arr.concat(emojis[key].keywords);
  }

  return arr;
}

function getFilename(locale) {
  return 'emoji-translation-' + locale + '.json';
}

function getPath(locale) {
  return __dirname + '/tmp/' + getFilename(locale);
}

function prepare(locale) { 
  var keywords = getKeywords();
  var cleanArr = sortByFrequencyAndRemoveDuplicates(keywords);

  execSync('mkdir -p ' + __dirname + '/tmp');

  fs.writeFileSync(getPath(locale), cleanArr.join('\n'));
  fs.writeFileSync(getPath('en-EN'), cleanArr.join('\n'));

  console.log();
  console.log('Please translate ' + getFilename(locale));
}

function createLanguageFile (locale) {

  var pathEn = getPath('en-EN');
  var pathLocale = getPath(locale);

  var contentArrEn = fs.readFileSync(pathEn, 'utf-8').split('\n');

  var contentArrLocale = fs
    .readFileSync(pathLocale, 'utf-8')
    .toLowerCase()
    .split('\n');

  var emojisPath = __dirname + '/../emojis.json';
  var emojiDest  = __dirname + '/../emojis-' + locale + '.json';

  execSync('cp ' + emojisPath + ' ' + emojiDest);

  contentArrEn.forEach(function (word, index) {
    // (?!:) prevent from replacing keys
    // https://regex101.com/r/wE8fH6/2
    var regex = new RegExp('"' + word + '"(?!:)(?!,\n)', 'g');
    fr.replaceSync(emojiDest, regex, '"' + contentArrLocale[index] + '"');
  });

  execSync('rm -rf ' + __dirname + '/tmp');

  // append exports to index.js

  var appendent = '\nmodule.exports[\'' + locale + '\'] = require("./emojis-' + locale + '.json")';
  fs.appendFile(__dirname + '/../index.js', appendent);
}

module.exports = {
  prepare: prepare,
  createLanguageFile: createLanguageFile
}