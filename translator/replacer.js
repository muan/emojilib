var fr = require('file-str-replace');
var fs = require('fs');

var de = fs.readFileSync('./fequency-de-DE.json', 'utf-8');
var en = fs.readFileSync('./frequency.json', 'utf-8');

var deArr = de.split('\n');
var enArr = en.split('\n');

enArr.forEach(function (word, index) {
  var regex = new RegExp('"' + word + '"', 'g');
  fr.replaceSync('./emojis-de-DE.json', regex, '"' + deArr[index] + '"');
});
