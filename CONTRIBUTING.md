# CONTRIBUTING

- **Test** with `npm test`.

```
$ npm test

# Tests

✔ checking dist/emoji-en-US.json [pass: 1807, fail: 0, duration: 60ms]

# Summary

duration: 60ms
planned: 1807
assertions: 1807
pass: 1807
fail: 0
```

- **Add new emoji** by upgrading `unicode-emoji-json`, and running `npm run upgrade` to add keywords to each new emoji.

```
$ npm run upgrade

checking dist/emoji-en-US.json
Enter a keyword for 🪤(mouse trap), leave it blank to go to the next one. cheese
Enter a keyword for 🪤(mouse trap), leave it blank to go to the next one. 
[saved] 🪤: mouse trap, cheese

Enter a keyword for 🪣(bucket), leave it blank to go to the next one. water
Enter a keyword for 🪣(bucket), leave it blank to go to the next one. container
Enter a keyword for 🪣(bucket), leave it blank to go to the next one. 
[saved] 🪣: bucket, water, container

added 2: 🪤, 🪣.
```

- **Add a localized dataset** by creating a new file with Unicode CLDR data via `npm run i18n [language-code] [cldr-language-code]`, and updating the file content.

```
$ npm run i18n

Please provide a langage code, which must be made of [primary language subtag]-[region subtag].
For example, use en-GB for English within United Kingdom, and use zh-TW for Chinese used in Taiwan.
See https://en.wikipedia.org/wiki/IETF_language_tag for more information.
```

```
$ npm run i18n zh-TW

CLDR lang required.
Options: af, am, ar, ar_SA, as, ast, az, be, bg, bn, br, bs, ca, ccp, ceb, chr, ckb, cs, cy, da, de, de_CH, doi, el, en, en_001, en_AU, en_CA, en_GB, en_IN, es, es_419, es_MX, es_US, et, eu, fa, fi, fil, fo, fr, fr_CA, ga, gd, gl, gu, ha, he, hi, hr, hu, hy, ia, id, ig, is, it, ja, jv, ka, kab, kk, kl, km, kn, ko, kok, ku, ky, lb, lo, lt, lv, mai, mi, mk, ml, mn, mni, mr, ms, mt, my, nb, ne, nl, nn, or, pa, pa_Arab, pcm, pl, ps, pt, pt_PT, qu, rm, ro, root, ru, rw, sa, sat, sd, si, sk, sl, so, sq, sr, sr_Cyrl, sr_Cyrl_BA, sr_Latn, sr_Latn_BA, su, sv, sw, sw_KE, ta, te, tg, th, ti, tk, to, tr, tt, ug, uk, ur, uz, vi, wo, xh, yo, yo_BJ, yue, yue_Hans, zh, zh_Hant, zh_Hant_HK, zu
```

```
 $ npm run i18n zh-TW zh_Hant

[created] ./dist/emoji-zh-TW.json | add keywords with `npm run improve zh-TW`.
```

- **Improve dataset** with `npm run improve [language-code]` to improve emoji with insufficent keywords.

```
$ npm run improve en-US

😀: 
Add a keyword: happy
Add a keyword: 
[saved] 😀: happy
```

- **Review dataset** with `npm run review [language-code]` to remove or edit keywords for each emoji.

```
$ npm run review en-US

[current] 😀: grinning_face, face, smile, happy, joy, :D, grin
Is "grinning_face" a suitable keyword for 😀? (y/n/e) e
What should "grinning_face" be changed to? grinning face
Is "face" a suitable keyword for 😀? (y/n/e) y
Is "smile" a suitable keyword for 😀? (y/n/e) y
Is "happy" a suitable keyword for 😀? (y/n/e) y
Is "joy" a suitable keyword for 😀? (y/n/e) y
Is ":D" a suitable keyword for 😀? (y/n/e) n
[saved] 😀: grinning face, face, smile, happy, joy, grin
```