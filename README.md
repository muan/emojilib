# emojilib [![Test dataset](https://github.com/muan/emojilib/actions/workflows/test.yml/badge.svg)](https://github.com/muan/emojilib/actions/workflows/test.yml) [![npm](https://img.shields.io/npm/dt/emojilib.svg?style=flat-square&colorB=fd7463)](https://www.npmjs.com/package/emojilib) [![JavaScript Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square&colorB=f1d04a)](https://github.com/feross/standard)

Make emoji searchable with this keyword library.

## Install

```
npm install emojilib --save
```

## Usage

```js
import emojilib from 'emojilib' with { type: 'json' }

console.log(emojilib)
```

```js
{
  '😀': [
    'grinning_face',
    'face',
    'smile',
    'happy',
    'joy',
    ':D',
    'grin'
  ],
  '😃': [
    'grinning_face_with_big_eyes',
    'face',
    'happy',
    'joy',
    'haha',
  ...
}
```

If you are looking for the unicode emoji dataset, including version, grouping, ordering, and skin tone support flag, check out [`unicode-emoji-json`](https://github.com/muan/unicode-emoji-json).

## Migrating from 2.x

Previously:

```js
var emoji = require("emojilib")
console.log(emoji.lib)
```

```js
{
  "grinning": {
    "keywords": ["face", "smile", "happy", "joy"],
    "char": "😀",
    "fitzpatrick_scale": false,
    "category": "people"
  },
  ...
}
```

Now, merge keywords with other metadata from `unicode-emoji-json`:

```js
import data from 'unicode-emoji-json' with { type: 'json' }
import keywordSet from 'emojilib' with { type: 'json' }

for (const emoji in data) {
  data[emoji]['keywords'] = keywordSet[emoji]
}
console.log(data['😀'])
```

```js
{
  name: 'grinning face',
  slug: 'grinning_face',
  group: 'Smileys & Emotion',
  emoji_version: '1.0',
  unicode_version: '1.0',
  skin_tone_support: false,
  keywords: [ 'grinning_face', 'face', 'smile', 'happy', 'joy', ':D', 'grin' ]
}
```

---

Previously:

```js
var emoji = require("emojilib")
console.log(emoji.ordered)
```

```js
['grinning', 'grimacing', 'grin', 'joy', 'smiley', 'smile', 'sweat_smile', ...]
```

Now this data can be found in `unicode-emoji-json`:

```js
import orderedEmoji from 'unicode-emoji-json/data-ordered-emoji.json' with { type: 'json' }

console.log(orderedEmoji)
```

```js
['😀', '😃', '😄', '😁', '😆', '😅',...]
```

---

Previously:

```js
var emoji = require("emojilib")
console.log(emoji.fitzpatrick_scale_modifiers)
```

```js
[ '🏻', '🏼', '🏽', '🏾', '🏿' ]
```

Now this data can be found in `unicode-emoji-json`:

```js
import components from 'unicode-emoji-json/data-emoji-components.json' with { type: 'json' }

console.log(components)
```

```js
{
  light_skin_tone: '🏻',
  medium_light_skin_tone: '🏼',
  medium_skin_tone: '🏽',
  medium_dark_skin_tone: '🏾',
  dark_skin_tone: '🏿',
  red_hair: '🦰',
  curly_hair: '🦱',
  white_hair: '🦳',
  bald: '🦲'
}
```

---

Previously:

```js
console.log(require("emojilib").lib['v'].fitzpatrick_scale)
console.log(require("emojilib").lib['turtle'].fitzpatrick_scale)
```

```js
true
false
```

Now this data can be found in `unicode-emoji-json`:

```js
import data from 'unicode-emoji-json' with { type: 'json' }

console.log(data['✌️'].skin_tone_support)
console.log(data['🐢'].skin_tone_support)
```

```js
true
false
```

## Development

See [`CONTRIBUTING.md`](CONTRIBUTING.md).
