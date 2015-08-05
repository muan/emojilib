var program = require('commander');
var lib = require('./lib');

program
  .version('0.1.0')

program
  .command('prepare')
  .description('prepares a tranlation file')
  .option("-l, --locale <locale>", 'locale e.g en-US, de-DE')
  .action(function(options){
    if(!options.locale) {
      console.log(program.commands[0].help());
    }

    lib.prepare(options.locale)
  });

program

  .command('create')
  .description('creates a language file which can be used by emojilib')
  .option("-l, --locale <locale>", 'locale e.g en-US, de-DE')
  .action(function(options) {
    if(!options.locale) {
      console.log(program.commands[1].help());
    }

    lib.createLanguageFile(options.locale)
  });


program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

