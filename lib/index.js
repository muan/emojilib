const config = require('./config.json')

module.exports = {
  lib: require('./emojis-en'),
  locales: config.locales.map((locale) => require(`./emojis-${locale}`)),
  ordered: config.ordered,
  fitzpatrick_scale_modifiers: ['🏻', '🏼', '🏽', '🏾', '🏿']
}
