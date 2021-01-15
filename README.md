# emojilib ![CI status](https://github.com/muan/emojilib/workflows/Test%20dataset/badge.svg?branch=main) [![npm](https://img.shields.io/npm/dt/emojilib.svg?style=flat-square&colorB=fd7463)](https://www.npmjs.com/package/emojilib) [![JavaScript Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square&colorB=f1d04a)](https://github.com/feross/standard)

Make emoji searchable with this keyword library.

## Install

```
npm install emojilib --save
```

## Usage

```javascript
> require("emojilib")
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
> var emoji = require("emojilib")
> emoji.lib
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
> var data = require('unicode-emoji-json')
> var keywordSet = require('emojilib')
> for (const emoji in data) {
data[emoji]['keywords'] = keywordSet[emoji]
}
> data['😀']
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
> var emoji = require("emojilib")
> emoji.ordered
[ 'grinning', 'grimacing', 'grin', 'joy', 'smiley', 'smile', 'sweat_smile', ...]
```

Now this data can be found in `unicode-emoji-json`:

```js
> var orderedEmoji = require('unicode-emoji-json/data-ordered-emoji')
['😀', '😃', '😄', '😁', '😆', '😅',...]
```

---

Previously:

```js
> var emoji = require("emojilib")
> emoji.fitzpatrick_scale_modifiers
[ '🏻', '🏼', '🏽', '🏾', '🏿' ]
```

Now this data can be found in `unicode-emoji-json`:

```js
> require('unicode-emoji-json/data-emoji-components')
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

Previously:

```js
> require("emojilib").lib['v'].fitzpatrick_scale
true

> require("emojilib").lib['turtle'].fitzpatrick_scale
false
```

Now this data can be found in `unicode-emoji-json`:

```js
> require('unicode-emoji-json')['✌️'].skin_tone_support
true
> require('unicode-emoji-json')['🐢'].skin_tone_support
false
```


## Development

- **Test** with `npm test`.
- **Add new emoji** by upgrading `unicode-emoji-json`, and running `npm run upgrade` to add keywords to each new emoji.
- **Translate dataset** starts with creating a new file via `npm run i18n [language-code]`, and updating the file content.
- **Improve dataset** with `npm run improve [language-code]` to improve emoji with insufficent keywords.
- **Review dataset** with `npm run review [language-code]` to remove or edit keywords for each emoji.
