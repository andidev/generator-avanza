'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

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
      type: 'confirm',
      name: 'someAnswer',
      message: 'Some spring angular 1 question?',
      default: true
    }];

    return this.prompt(prompts).then(function (answers) {
      this.templateContext.someAnswer = answers.someAnswer;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(this.templatePath('dummyfile.txt'), this.destinationPath('dummyfile.txt'));
    this.fs.copyTpl(this.templatePath('templatefile.txt'), this.destinationPath('templatefile.txt'), this.templateContext);
  },

  install: function () {
    this.installDependencies({
      bower: false
    });
  }
});
