'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

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
      message: 'Some spring angular 2 question?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(this.templatePath('dummyfile.txt'), this.destinationPath('dummyfile.txt'));
  },

  install: function () {
    this.installDependencies({
      bower: false
    });
  }
});
