var _s = require('underscore.string');

module.exports = {
  inputIsNotEmpty: inputIsBlank
};

function inputIsBlank(errorMessage) {
  return function (answer){
    return _s.isBlank(answer) ? errorMessage : true;
  }
}
