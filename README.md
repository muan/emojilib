# :book: emojilib [![Travis CI](https://travis-ci.org/muan/emojilib.svg?branch=master)](https://travis-ci.org/muan/emojilib)

Emoji keyword library.

## Install

### :bird: Bower

```
bower install emojilib
```

### :package: NPM

```
npm install emojilib --save
```

```javascript
var emojis = require("emojilib")
```

## Usage

```javascript
> emojis
{
  "grinning": {
    "keywords": ["face", "smile", "happy", "joy"],
    "char": "😀",
    "category": "people"
  },
  "grin": {
    "keywords": ["face", "happy", "smile", "joy"],
    "char": "😁",
    "category": "people"
  },
  ...
}

> emojis.keys
[ 'grinning', 'grin', 'joy', 'smiley', 'smile', 'sweat_smile', ...]
```

## :electric_plug: Powered by emojilib

* [Emoji Searcher](http://emoji.muan.co) – [muan/emoji](https://github.com/muan/emoji)
* [Megamoji](http://megamoji.muan.co) – [muan/megamoji](https://github.com/muan/megamoji)
* [Emoji-translate](http://meowni.ca/emoji-translate) - [notwaldorf/emoji-translate](https://github.com/notwaldorf/emoji-translate)
* [\<emo-ji\> Custom Element](https://github.com/wbinnssmith/emo-ji)
* [Menubar emoji search: Mojibar](https://github.com/muan/mojibar) – [muan/mojibar](https://github.com/muan/mojibar)
* [Emoji CLI](https://github.com/muan/emoji-cli) – [muan/emoji-cli](https://github.com/muan/emoji-cli)

## :heart: YES

This library was originially started for/in [the Emoji Searcher project](http://github.com/muan/emoji) by @muan.
