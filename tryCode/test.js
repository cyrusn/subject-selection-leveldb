const fs = require('fs');
const CsvConverter = require('csvtojson').Converter;
const csvtojson = new CsvConverter({
  constructResult: false,
  toArrayString: true
});

const readable = fs.createReadStream('/Users/CyrusN/Desktop/ranks.csv')
const writable = fs.createWriteStream('/Users/CyrusN/Desktop/ranks.json')
readable.pipe(csvtojson).pipe(writable)
