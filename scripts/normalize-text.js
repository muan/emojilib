module.exports = function toNormalizedText(text = '') {
  return text
    .toLowerCase()
    .replaceAll(/[ \u00A0,)(]/g, '_')
    .replaceAll(':', '')
    .replaceAll('-', '_')
    .replaceAll(/__/g, '_')
    .replaceAll(/^_/g, '')
    .replaceAll(/_$/g, '')
}

