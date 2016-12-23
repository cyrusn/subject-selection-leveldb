'use strict';
// TODO: Try to use lightweight Moment
const studentRankFilePath = require('../../utils/constant.js').studentRankFilePath;
const subjectCapacityFilePath = require('../../utils/constant.js').subjectCapacityFilePath;
const allocateHelper = require('../../utils/allocateHelper');
const Fs = require('fs');
const DB = require('../db').db;
const Async = require('async');
const _ = require('lodash');
const json2csv = require('json2csv');
const Moment = require('moment');
const Combination = require('../../../json/combination');
const OleSubjects = require('../../../json/oles');
const combo2Key = require('../../utils/csvHelper').combo2Key;
const getComboById = require('../../utils/csvHelper').getComboById;
const convertCombosArrayToObject = require('../../utils/csvHelper').convertCombosArrayToObject;
const convertOlesArrayToObjectoles = require('../../utils/csvHelper').convertOlesArrayToObjectoles;

module.exports = (request, reply) => {
  Async.waterfall([
    // check precondition files
    callback => {
      const PreConditionFilesFilePaths = {
        studentRank: studentRankFilePath,
        subjectCapacity: subjectCapacityFilePath
      };
      const PreConditionFiles = {};
      return Async.forEachOf(
        PreConditionFilesFilePaths,
        (value, key, cb) => {
          Fs.access(value, Fs.R_OK, (err, data) => {
            if (err) return cb(err);

            Fs.readFile(value, 'utf8', (err, content) => {
              if (err) return cb(err);

              PreConditionFiles[key] = JSON.parse(content);
              cb(null);
            });
          });
        },
        err => {
          if (err) return callback(err);
          callback(null, PreConditionFiles);
        }
      );
    },
    // get users
    (PreConditionFiles, callback) => {
      const filteredStudents = [];
      const studentRank = PreConditionFiles.studentRank;
      DB.createReadStream()
        .on('data', user => {
          if (user.value.info.isAdmin) return false;
          if (!user.value.subjectPriority.isConfirmed) return false;
          const rank = _.result(_.find(studentRank, {username: user.key}), 'rank');
          if (rank === undefined) return false;
          user.rank = rank;

          delete user.value.info.password;

          filteredStudents.push(user);
        })
        .on('error', err => {
          callback(err);
        })
        .on('end', () => {
          callback(null, PreConditionFiles.subjectCapacity, _.sortBy(filteredStudents, 'rank'));
        });
    },
    // allocate
    (subjectCapacity, students, callback) => {
      allocateHelper(subjectCapacity, students, callback);
    }],
    (err, students, statistic) => {
      if (err) return reply(err);

      if (request.params.type === 'statistic') return reply(statistic);

      // return request.params.type === students;
      const results = students.map(student => {
        const comboId = student.value.subjectPriority.result.assignedCombo;
        const username = student.key;
        const info = student.value.info;
        const assignedSubjectX1 = _.find(Combination, {id: comboId}).subjects[0];
        const assignedSubjectX2 = _.find(Combination, {id: comboId}).subjects[1];
        const isConfirmed = student.value.subjectPriority.isConfirmed;
        const rankInSubjectX1 = student.value.subjectPriority.result.rankInSubjects[0];
        const rankInSubjectX2 = student.value.subjectPriority.result.rankInSubjects[1];
        const preference = student.value.subjectPriority.result.preference + 1;
        const combos = convertCombosArrayToObject(student.value.subjectPriority.combos);
        const oles = convertOlesArrayToObjectoles(student.value.subjectPriority.oles);
        const rank = student.rank;

        return Object.assign({}, info, {rank, username, isConfirmed, assignedSubjectX1, assignedSubjectX2, rankInSubjectX1, rankInSubjectX2, preference}, ...combos, ...oles);
      });

      const header = [
        'username',
        'name',
        'classNo',
        'isConfirmed',
        // combos headers
        ..._.range(Combination.length).map(comboId => combo2Key('+', getComboById(comboId))),
        // Oles header
        ..._.pluck(OleSubjects, 'name'),
        'assignedSubjectX1',
        'assignedSubjectX2',
        'rankInSubjectX1',
        'rankInSubjectX2',
        'preference',
        'rank'
      ];
      const filename = Moment().format('YYYYMMDD-HHmmss');
      json2csv({ data: _.sortBy(results, 'classNo'), fields: header }, function (err, csv) {
        if (err) return reply(err);
        return reply(csv)
          .type('text/csv')
          .header('Content-Disposition', `attachment; filename=allocation-${filename}.csv`);
      });
    });
};
