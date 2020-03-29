const fs = require('fs');
const through2 = require('through2');

const { encode, decode } = require('../actions/encode_decode');

function readStream(filePath) {
  if (!filePath) {
    return process.stdin;
  }
  return fs.createReadStream(filePath);
}

function transformStream(shift, action) {
  return through2(function a(chunk, enc, callback) {
    chunk = chunk.toString('utf8');
    chunk = action === 'encode' ? encode(chunk, shift) : decode(chunk, shift);

    this.push(chunk);

    callback();
  });
}

function writeStream(filePath) {
  if (!filePath) {
    return process.stdout;
  }
  return fs.createWriteStream(filePath, {
    flags: 'a',
    encoding: null,
    mode: '0666'
  });
}

module.exports = {
  readStream,
  transformStream,
  writeStream
};
