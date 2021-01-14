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

If you are looking for the unicode emoji dataset, including version, grouping, ordering, skin tone suppoer, check out [`unicode-emoji-json`](https://github.com/muan/unicode-emoji-json).

## Development

Test with `npm test`.

After upgrading `unicode-emoji-json`, use `npm run upgrade` to add keywords to each new emoji.
