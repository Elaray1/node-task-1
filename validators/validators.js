const fs = require('fs');
const exit = process.exit;
const { ACTIONS } = require('../constants');

function endProcessWithError(errorMessage) {
  process.stderr.write(errorMessage);
  exit(1);
}

function validate({ action, shift, input, output }) {
  if (!ACTIONS.includes(action)) {
    endProcessWithError('Incorrect action value\n');
  }

  if (!Number.isInteger(+shift) || !(shift >= 0)) {
    endProcessWithError('Incorrect shift value\n');
  }

  if (input) {
    fs.access(input, fs.constants.F_OK || fs.constants.R_OK, err => {
      if (err) {
        endProcessWithError('Incorrect input file\n');
      }
    });
  }

  if (output) {
    fs.access(output, fs.constants.F_OK || fs.constants.W_OK, err => {
      if (err) {
        endProcessWithError('Incorrect output file\n');
      }
    });
  }
}

module.exports = validate;
