'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the tremendous ' + chalk.red('Avanza Yeoman') + ' generator!'
    ));

    const APPLICATION_TYPE = {
      SPRING_ANGULAR_1 : "Spring Angular 1",
      SPRING_ANGULAR_2 : "Spring Angular 2"
    };

    var prompts = [{
      type: 'list',
      name: 'applicationType',
      message: 'What type of application do you want to genarate?',
      choices: [
        APPLICATION_TYPE.SPRING_ANGULAR_1,
        APPLICATION_TYPE.SPRING_ANGULAR_2
      ],
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
