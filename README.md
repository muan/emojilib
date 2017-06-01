# :book: emojilib [![Travis CI build status](https://img.shields.io/travis/muan/emojilib.svg?style=flat-square)](https://travis-ci.org/muan/emojilib) [![NPM](https://img.shields.io/npm/dt/emojilib.svg?style=flat-square&colorB=fd7463)](https://www.npmjs.com/package/emojilib) [![JavaScript Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square&colorB=f1d04a)](https://github.com/feross/standard)

Emoji keyword library.

## Install

### :bird: Bower<br>![](https://img.shields.io/bower/v/emojilib.svg?style=flat-square)

```
bower install emojilib
```

### :package: NPM<br>![](https://img.shields.io/npm/v/emojilib.svg?style=flat-square)

```
npm install emojilib --save
```

## Usage

```javascript
> var emoji = require("emojilib")
> emoji.lib
{
  "grinning": {
    "keywords": ["face", "smile", "happy", "joy"],
    "char": "😀",
    "fitzpatrick_scale": false,
    "category": "people"
  },
  "grin": {
    "keywords": ["face", "happy", "smile", "joy"],
    "char": "😁",
    "fitzpatrick_scale": false,
    "category": "people"
  },
  ...
}

> emoji.ordered
[ 'grinning', 'grimacing', 'grin', 'joy', 'smiley', 'smile', 'sweat_smile', ...]

> emoji.fitzpatrick_scale_modifiers
[ '🏻', '🏼', '🏽', '🏾', '🏿' ]

> emoji.lib.v.fitzpatrick_scale
true

> emoji.lib.turtle.fitzpatrick_scale
false

> emoji.lib.v.char + emoji.fitzpatrick_scale_modifiers[4]
'✌🏿'
```

## :electric_plug: Powered by emojilib

* [Emoji Searcher](http://emoji.muan.co) – [muan/emoji](https://github.com/muan/emoji)
* [Megamoji](http://megamoji.muan.co) – [muan/megamoji](https://github.com/muan/megamoji)
* [Emoji-translate](http://meowni.ca/emoji-translate) - [notwaldorf/emoji-translate](https://github.com/notwaldorf/emoji-translate)
* [\<emo-ji\> Custom Element](https://github.com/wbinnssmith/emo-ji)
* [Menubar emoji search: Mojibar](https://github.com/muan/mojibar) – [muan/mojibar](https://github.com/muan/mojibar)
* [Emoji CLI](https://github.com/muan/emoji-cli) – [muan/emoji-cli](https://github.com/muan/emoji-cli)
* [Emoji Lookup for Launchbar](https://github.com/jasonrudolph/launchbar-emoji-lookup) – [jasonrudolph/launchbar-emoji-lookup](https://github.com/jasonrudolph/launchbar-emoji-lookup)
* [commemoji](https://www.npmjs.com/package/commemoji) - [martellaj/commemoji](https://github.com/martellaj/commemoji)
* [Emoji Stream](https://www.npmjs.com/package/emoji-stream) – [johnelliott/emoji-stream](https://github.com/johnelliott/emoji-stream)
* [EmojiPanel for Twitter](http://bit.ly/emojipanel) - [danbovey/EmojiPanel](https://github.com/danbovey/EmojiPanel)
* [mojibrag](https://mojibrag.firebaseapp.com/) - [notwaldorf/mojibrag](https://github.com/notwaldorf/mojibrag)
