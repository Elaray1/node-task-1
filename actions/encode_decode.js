const { ALPHABET } = require('../constants');

function encode(text, shift) {
  let encodedText = '';

  shift = shift % ALPHABET.length;

  for (let i = 0; i < text.length; i++) {
    let symbol = text[i];

    if (ALPHABET.includes(symbol.toLowerCase())) {
      const alphabet =
        symbol === symbol.toLowerCase() ? ALPHABET : ALPHABET.toUpperCase();

      const encodedIndex = (alphabet.indexOf(symbol) + shift) % alphabet.length;
      symbol = alphabet[encodedIndex];
    }

    encodedText += symbol;
  }

  return encodedText;
}

function decode(text, shift) {
  let decodedText = '';

  shift = shift % ALPHABET.length;

  for (let i = 0; i < text.length; i++) {
    let symbol = text[i];

    if (ALPHABET.includes(symbol.toLowerCase())) {
      const alphabet =
        symbol === symbol.toLowerCase() ? ALPHABET : ALPHABET.toUpperCase();

      let decodedIndex = alphabet.indexOf(symbol) - shift;

      if (decodedIndex < 0) {
        decodedIndex = alphabet.length - Math.abs(decodedIndex);
      }

      symbol = alphabet[decodedIndex];
    }

    decodedText += symbol;
  }

  return decodedText;
}

module.exports = {
  encode,
  decode
};
