'use strict';
const Boom = require('boom');
const Aysnc = require('async');
const Fs = require('fs');
const Stream = require('stream');
const path = require('../../utils/constant').studentRankFilePath;
const Joi = require('joi');

module.exports = (request, reply) => {
  const CsvConverter = require('csvtojson').Converter;
  const csvtojson = new CsvConverter({
    constructResult: false,
    toArrayString: true
  });
  // ----------------------------
  // DONE: stream way
  // stream, like promise, is designed to replace node callback (`cb(err, data)`)
  // with https://www.npmjs.com/package/csv2json
  //
  // DONE: but you need to verify rank before saving
  // use your way as Joi does not support stream
  // const rankStream = request.payload.rank;
  // if (!rank instanceof Stream.Readable) {
  //   // DONE: would this ever happen if we specified payload? need verify
  //   return reply(Boom.badData('No file upload'));
  // }
  // rankStream
  //   .pipe(csv2json())
  //   .pipe(fs.createWriteStream(path));
  // ----------------------------

  Aysnc.waterfall([
    (callback) => {
      // leesei: DONE: remember return early?
      if (request.method === 'get') {
        return callback(null);
      }

      // POST method
      // csvtojson.on('record_parsed', function (resultRow, rawRow, rowIndex) {
      //   console.log(rowIndex, resultRow, rawRow);
      //   return resultRow;
      // });
      const rankStream = request.payload.rank;
      if (!rankStream instanceof Stream.Readable) {
        return callback(Boom.badData('no file upload'));
      }

      console.log(rankStream.toString());

      // DONE: stream may emit multiple 'data' events
      // each time with a chunk
      // handling single chunk may not be complete
      // http://stackoverflow.com/a/14269536/665507
      // converter Stream.Readable to text

      const writable = Fs.createWriteStream(path, 'utf8');
      const schema = Joi.string().regex(/^username,rank$|^lp\d+,\d+$/);
      rankStream
        .on('data', (data) => {
          schema.validate(data.toString('utf8'), err => {
            if (err) {
              return callback(err);
            }
          });
        })
        .pipe(csvtojson)
        .pipe(writable);

      writable.on('finish', callback);
    },
    // check if subjectCapacity.json exist
    (callback) => {
      Fs.access(path, Fs.R_OK, callback);
    },
    // read subjectCapacity.json file
    (callback) => {
      Fs.readFile(path, 'utf8', callback);
    }
  ],
  (err, json) => {
    if (err) {
      return reply(Boom.badImplementation(err));
    }
    try {
      return reply(JSON.parse(json));
    } catch (err) {
      return reply(Boom.badImplementation(err));
    }
  });
};
