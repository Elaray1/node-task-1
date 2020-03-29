const fs = require('fs');
const { program } = require('commander');
const stream = require('stream');
const { promisify } = require('util');
const pipeline = promisify(stream.pipeline);
const validate = require('./validators/validators');
const exit = process.exit;

const {
  readStream,
  transformStream,
  writeStream
} = require('./streams/streams');

program
  .storeOptionsAsProperties(false)
  .requiredOption('-s, --shift <shift>', 'a shift')
  .requiredOption('-a, --action <action>', 'an action encode/decode')
  .option('-i, --input <input>', 'an input file')
  .option('-o, --output <output>', 'an output file')
  .parse(process.argv);

const options = program.opts();

validate(options);

if (!fs.existsSync(options.output)) {
  console.error('Incorrect output name!');
  exit(1);
}

pipeline(
  readStream(options.input),
  transformStream(+options.shift, options.action),
  writeStream(options.output)
).catch(error => {
  console.error(error);
});
