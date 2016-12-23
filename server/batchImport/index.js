#!/usr/bin/env node
'use strict';

const Students = require('./data/student');
const Teachers = require('./data/teacher');
const Dummies = require('./data/dummy');
const importUser = require('../utils/importUser');
const Async = require('async');
const DB = require('../lib/db').db;
const Location = require('../lib/db').location;

Async.series([
  // closeDB
  (callback) => {
    DB.close(err => {
      if (err) return callback(err);

      console.log('DB closed');
      callback(null);
    });
  },
  // dropDB
  (callback) => {
    require('leveldown').destroy(Location, err => {
      if (err) return callback(err);
      console.log('DB Dropped!');
      callback(null);
    });
  },
  // openDB
  (callback) => {
    DB.open(err => {
      if (err) return callback(err);
      console.log('DB opened');
      callback(null);
    });
  },
  // importDummies
  (callback) => {
    Async.each(Dummies, (dummy, cb) => {
      importUser(dummy, false, cb);
    }, err => {
      if (err) return callback(err);
      console.log('All dummies imported');
      return callback(null);
    });
  },
  // importStudents
  (callback) => {
    Async.each(Students, (student, cb) => {
      importUser(student, false, cb);
    }, err => {
      if (err) return callback(err);
      console.log('All students imported');
      return callback(null);
    });
  },
  // importTeachers
  (callback) => {
    Async.each(Teachers, (teacher, cb) => {
      importUser(teacher, true, cb);
    }, err => {
      if (err) return callback(err);
      console.log('All teachers imported');
      return callback(null);
    });
  }],
  // finally
  err => {
    if (err) {
      return console.log(err);
    }
    console.log('=> All Users are imported');
  }
);
