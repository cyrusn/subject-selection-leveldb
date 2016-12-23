'use strict';
// leesei:
// change API
// reduce dependency, accept data as input
// should not depends on DB
// this also make it easier to write test cases
// see test/allocate.js
// leesei: comments on the algorithm reserved
//
// TODO: Log students who have no rank
// leesei: set in error object?

const Async = require('async');
const combination = require('../../json/combination');
const _ = require('lodash');

// const EALLOCHELPER = require('debug')('ALLOCHELPER:E');
// const DALLOCHELPER = require('debug')('ALLOCHELPER:D');

/*
  PreConditionFiles = {
    studentRank, subjectCapacity
  }
*/
module.exports = function (subjectCapacity, filteredStudents, finalCallback) {
  // an array for subjects who reached the max capacity, order is preserved
  const fullSubjectsList = [];
  const noOfStudentInSubject = {
    phy: 0,
    bio: 0,
    bafs: 0,
    chist: 0,
    ths: 0,
    ict1: 0,
    va: 0,
    chem: 0,
    cscb: 0,
    cscp: 0,
    econ: 0,
    hist: 0,
    geog: 0,
    ict2: 0
  };

  function isSubjectsAvailable (subjects) {
    const intersection = _.intersection(fullSubjectsList, subjects);
    return _.isEmpty(intersection);
  }

  // add 1 to `noOfStudentInSubject`,
  // return the ranking in subject
  // return false if subject is full
  // to use this function , check condition first.
  function assignStudentToSubject (subject, callback) {
    noOfStudentInSubject[subject] ++;

    // if true, mean reach the max, will push subject to fullSubjectsList;
    if (subjectCapacity[subject] === noOfStudentInSubject[subject]) {
      fullSubjectsList.push(subject);
    }
    // return the ranking in subject 第幾個入呢科
    // e.g. 3 mean in 1st subject,
    // he / she is the third one who is assigned to this subject
    return noOfStudentInSubject[subject];
  }

  // allocate combination to student;
  // combos is array of comboId, order is preserved
  function allocateCombo (combos, index, callback) {
    if (index >= combination.length) {
      // err.data = {
      //   fullSubjectsList,
      //   noOfStudentInSubject
      // };
      // EALLOCHELPER(err);
      return callback(new Error('No Subject Match'));
    }

    const comboId = combos[index];
    const subjects = combination[comboId].subjects;
    const rankInSubjects = [];

    // DALLOCHELPER(subjects);
    // DALLOCHELPER(subjectCapacity);
    if (isSubjectsAvailable(subjects)) {
      subjects.forEach(subject => {
        const rankInSubject = assignStudentToSubject(subject);
        rankInSubjects.push(rankInSubject);
      });
      return callback(null, comboId, rankInSubjects);
    }

    return allocateCombo(combos, index + 1, callback);
  }

  Async.mapSeries(filteredStudents, (student, cb) => {
    const subjectPriority = student.value.subjectPriority;
    const combos = subjectPriority.combos;

    allocateCombo(combos, 0, (err, comboId, rankInSubjects) => {
      if (err) return cb(err);

      subjectPriority.result = {
        assignedCombo: comboId,
        rankInSubjects: rankInSubjects,
        preference: _.indexOf(combos, comboId)
      };
      return cb(null, student);
    });
  },
  (err, students) => {
    if (err) return finalCallback(err);
    const statistic = {
      noOfStudent: students.length,
      fullSubjectsList,
      noOfStudentInSubject,
      subjectCapacity
    };
    return finalCallback(null, students, statistic);
  });
};
