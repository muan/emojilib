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

- **Augment dataset** with `npm run augment-en` to bring in en-US keywords used in common emoji platforms

```
$ npm run augment-en
Augmented 123 emoji with a total of 456 keyword(s)
```
