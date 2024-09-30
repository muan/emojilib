const fs = require('fs')
  
start()

async function start() {
  const path = `dist/emoji-en-US.json`
  const allEmojiData = require(`../${path}`)
  const missing = await generateAugmentations(allEmojiData)
  let addedCounts = {}

  for (const emoji in allEmojiData) {
    const existing = allEmojiData[emoji]
    const existingLikeWords = existing.join('_').split(/[ _]/)
    const existingLowerCase = existing.map(keyword => keyword.toLowerCase())
    const missingKeywords = missing[emoji]?.filter(
      keyword =>
        /[A-z]/.test(keyword) &&
        !keyword.includes('_') &&
        !existingLikeWords.includes(keyword) &&
        !existingLowerCase.includes(keyword)
    )

    if (missingKeywords?.length) {
      allEmojiData[emoji] = [...existing, ...missingKeywords]
      addedCounts[emoji] = missingKeywords.length
    }
  }

  fs.writeFileSync(`./${path}`, JSON.stringify(allEmojiData, null, 2))
  const addedTo = Object.keys(addedCounts).length
  const addedTotal = Object.values(addedCounts).reduce((a, b) => a + b, 0)
  console.log('Augmented', addedTo, 'emoji with a total of', addedTotal, 'keyword(s)')
}

async function generateAugmentations(existingData) {
  const emojipedia = await import('emojipedia/data')
  const {byTitle} = await import('emoji-platform-data')
  const changeCase = await import('change-case')

  const ignoredValues = new Set(['a', 'and', 'at', 'in', 'is', 'it', 'of', 'on', 'the', 'to', 'with'])

  function toPartialKeywords(candidateKeywords, fullKeywords = candidateKeywords) {
    return candidateKeywords
      ? toUniqueSortedArray(
          candidateKeywords
            .flatMap(text => text.replaceAll(/[:,]/g, '').split(/[ _]/g))
            .filter(keyword => !fullKeywords.includes(keyword))
        )
      : []
  }

  function toUniqueSortedArray(values) {
    return Array.from(new Set(values))
      .filter(value => !ignoredValues.has(value))
      .sort()
  }

  function toNormalizedText(text = '') {
    return text
      .toLowerCase()
      .replaceAll(/[ ,)(]/g, '_')
      .replaceAll(':', '')
      .replaceAll('-', '_')
      .replaceAll(/__/g, '_')
      .replaceAll(/^_/g, '')
      .replaceAll(/_$/g, '')
  }

  function toNormalizedTitle(text) {
    return changeCase.pascalCase(text).replaceAll(' ', '')
  }

  function generateFullIdentityKeywords(inEmojilib, platforms) {
    const inEmojipedia = getKeywordsForEmojipediaEntry(platforms.emojipedia).map(toNormalizedText)
    const inFluemoji = platforms.fluemoji && [platforms.fluemoji.cldr, platforms.fluemoji.tts].map(toNormalizedText)
    const inGemoji = platforms.gemoji?.names
    const inTwemoji = platforms.twemoji && [platforms.twemoji.description].map(toNormalizedText)
    const inAny = [inFluemoji, inGemoji, inTwemoji, inEmojipedia]
      .flat()
      .map(text => text && toNormalizedText(text))
      .filter(x => !!x)

    return {
      inAny,
      inEmojilib,
      inEmojipedia,
      inFluemoji,
      inGemoji,
      inTwemoji
    }
  }

  function generatePartialIdentityKeywords(keywordsEmojilib, fullIdentity) {
    const inAny = toPartialKeywords(fullIdentity.inAny)
    const inEmojilib = toPartialKeywords(keywordsEmojilib)
    const inEmojipedia = toPartialKeywords(fullIdentity.inEmojipedia)
    const inFluemoji = toPartialKeywords(fullIdentity.inFluemoji)
    const inGemoji = toPartialKeywords(fullIdentity.inGemoji)
    const inTwemoji = toPartialKeywords(fullIdentity.inTwemoji)

    return {
      inAny,
      inEmojilib,
      inEmojipedia,
      inFluemoji,
      inGemoji,
      inTwemoji
    }
  }

  function getKeywordsForEmojipediaEntry(entry) {
    return [entry.appleName, entry.currentCldrName, entry.title, ...(entry.alsoKnownAs ?? [])].map(toNormalizedText)
  }

  function generateRelationKeywords(fullIdentity, partialIdentity, platforms) {
    const partialIdentityKeywords = [...fullIdentity.inAny, ...partialIdentity.inAny]
    const inFluemoji = toPartialKeywords(platforms.fluemoji?.keywords, partialIdentityKeywords)
    const inGemoji = toPartialKeywords(
      platforms.gemoji && [platforms.gemoji.description, ...platforms.gemoji.tags],
      partialIdentityKeywords
    )
    const inTwemoji = toPartialKeywords(
      platforms.twemoji && 'keywords' in platforms.twemoji ? platforms.twemoji.keywords : undefined,
      partialIdentityKeywords
    )

    const inAny = toUniqueSortedArray([...inFluemoji, ...inGemoji, ...inTwemoji])

    return {inAny, inFluemoji, inGemoji, inTwemoji}
  }

  function generateAllEmojiKeywords(emojis) {
    return emojis.map(emoji => {
      const keywordsEmojilib =
        existingData[emoji.code] ??
        Object.values(existingData).find(
          keywords =>
            Array.isArray(keywords) && keywords[0].replaceAll(/[\W_]/g, '') === emoji.slug.replaceAll(/[\W_]/g, '')
        )

      const platforms =
        (emoji.currentCldrName && byTitle[toNormalizedTitle(emoji.currentCldrName)]) ??
        byTitle[toNormalizedTitle(emoji.title)] ??
        Object.values(byTitle).find(platformData => platformData.emojipedia?.title === emoji.title)

      const fullIdentity = generateFullIdentityKeywords(keywordsEmojilib, platforms)
      const partialIdentity = generatePartialIdentityKeywords(keywordsEmojilib, fullIdentity)
      const relationIdentity = generateRelationKeywords(fullIdentity, partialIdentity, platforms)

      return {
        emoji,
        fullIdentity,
        partialIdentity,
        relationIdentity
      }
    })
  }

  function generateMissingKeywords(allKeywords) {
    return allKeywords.map(keywords => {
      const existing = keywords.fullIdentity.inEmojilib

      const proposed = toUniqueSortedArray(
        [
          keywords.fullIdentity.inEmojipedia,
          keywords.fullIdentity.inFluemoji,
          keywords.fullIdentity.inGemoji,
          keywords.fullIdentity.inTwemoji,
          keywords.partialIdentity.inEmojipedia,
          keywords.partialIdentity.inFluemoji,
          keywords.partialIdentity.inGemoji,
          keywords.partialIdentity.inTwemoji,
          keywords.relationIdentity.inFluemoji,
          keywords.relationIdentity.inGemoji,
          keywords.relationIdentity.inTwemoji
        ]
          .flat()
          .map(toNormalizedText)
          .filter(Boolean)
      )

      const added = proposed.filter(keyword => !existing.includes(keyword))
      return [keywords.emoji.code, added]
    })
  }

  const emojis = Object.values(emojipedia)
  const allEmojiKeywords = await generateAllEmojiKeywords(emojis)
  const missingKeywords = await generateMissingKeywords(allEmojiKeywords)

  return Object.fromEntries(missingKeywords)
}
