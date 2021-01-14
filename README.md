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

## Development

- **Test** with `npm test`.
- **Add new emoji** by upgrading `unicode-emoji-json`, and running `npm run upgrade` to add keywords to each new emoji.
- **Translate dataset** starts with creating a new file via `npm run i18n [language-code]`, and updating the file content.
- **Improve dataset** with `npm run work [language-code]` to improve emoji with insufficent keywords.
