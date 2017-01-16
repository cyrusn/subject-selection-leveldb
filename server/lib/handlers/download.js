'use strict';
const _ = require('lodash');
const Combination = require('../../../json/combination');
const DB = require('../db').db;
const Boom = require('boom');
const json2csv = require('json2csv');
const Moment = require('moment');
const getComboById = require('../../utils/csvHelper').getComboById;
const combo2Key = require('../../utils/csvHelper').combo2Key;
const convertCombosArrayToObject = require('../../utils/csvHelper').convertCombosArrayToObject;
// const convertOlesArrayToObjectoles = require('../../utils/csvHelper').convertOlesArrayToObjectoles;
// const OleSubjects = require('../../../json/oles');

module.exports = (request, reply) => {
  const type = request.params.type;
  const result = [];

  DB.createReadStream()
    .on('data', user => {
      // exclude admins from list
      if (user.value.info.isAdmin) return;

      // just export database schema (w/o pw) for JSON output

      if (type === 'json') {
        delete user.value.info.password;
        result.push(user);
        return;
      }

      // re-construct info applicable for CSV output
      const info = {
        username: user.key,
        name: user.value.info.name,
        classNo: user.value.info.classNo,
        isConfirmed: user.value.subjectPriority.isConfirmed
      };

      // convert array of combination ids to
      // object with {'combination string': priority}

      // the return value is the priority with starting index 1
      const combos = convertCombosArrayToObject(user.value.subjectPriority.combos);

      // convert array of ole ids to
      // object with {'ole string': priority}
      // the return value is the priority with starting index 1
      // const oles = convertOlesArrayToObjectoles(user.value.subjectPriority.oles);

      // flatten all objects
      result.push(
        // Object.assign({}, info, ...combos, ...oles)
        Object.assign({}, info, ...combos)
      );
      return;
    })
    .on('error', (err) => {
      if (err) {
        console.log(err);
        return reply(Boom.serverTimeout(err));
      }
    })
    .on('end', () => {
      // leesei: using Moment for this is a little bit over kill
      // see `commonroom/node-belt/date.js`
      // cyrusn: use util/date.js instead?
      // leesei: yes, write a custom formating function
      // `formatDate.js`
      const filename = Moment().format('YYYYMMDD-HHmmss');

      if (type === 'json') {
        return reply(JSON.stringify(result))
          .type('application/json')
          .header('Content-Disposition', `attachment; filename=${filename}.json`);
      }

      // construct headers for json2csv
      const headers = [
        'username',
        'name',
        'classNo',
        'isConfirmed',
        // combos headers
        ..._.range(Combination.length).map(comboId => combo2Key('+', getComboById(comboId))),
        // Oles header
        // ..._.pluck(OleSubjects, 'name')
      ];

      json2csv({ data: _.sortBy(result, 'classNo'), fields: headers }, function (err, csv) {
        if (err) console.log(err);
        return reply(csv)
          .type('text/csv')
          .header('Content-Disposition', `attachment; filename=rawdata-${filename}.csv`);
      });
    });
};
