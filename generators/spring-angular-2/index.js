'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fsPromise = require('fs-promise');
var utils = require('./../utils');
var validators = require('./../validators');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.templateContext = {};

    // This adds support for a `--skip-greeting` flag
    this.option('skip-greeting', {
      desc: 'Skip greeting',
      type: Boolean,
      defaults: false
    });
  },

  prompting: function () {

    if (!this.options['skip-greeting']) {
      this.log(yosay(
        'Welcome to the gnarly ' + chalk.red('Avanza Yeoman') + ' generator!'
      ));
    }

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'What is the name of the application?',
      validate: validators.inputIsNotEmpty("You must provide an application name")
    }];

    return this.prompt(prompts).then(function (answers) {
      this.templateContext.appName = answers.appName;
      var appNameEnglish = utils.replaceSwedishCharactersWithEnglish(answers.appName);
      this.templateContext.appNameKebabCased = utils.kebabCase(appNameEnglish);
      this.templateContext.appNameCamelCased = utils.camelCase(appNameEnglish);
      this.templateContext.appNameUpperCamelCased = utils.upperCamelCase(appNameEnglish);
      console.log("this.templateContext = ", this.templateContext);
    }.bind(this));
  },

  writing: function () {

    var cb = this.async();
    var self = this;
    fsPromise.walk(this.templatePath())
      .then(function (listing) {
        listing.forEach(function (file) {
          if (fsPromise.lstatSync(file.path).isFile()) {
            var relativePath = file.path.replace(self.templatePath() + "/", "");
            var filteredPath = relativePath.replace(/application-name/g, self.templateContext.appNameKebabCased);
            self.fs.copyTpl(
              self.templatePath(file.path),
              self.destinationPath(filteredPath),
              self.templateContext
            );
          }
        });
        cb();
      })
      .catch(function (err) {
        console.error(err)
      });
  },

  install: function () {
    this.installDependencies({
      bower: false
    });
  }
});
