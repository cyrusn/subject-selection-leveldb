'use strict';
const Bcrypt = require('bcrypt');
const DB = require('../lib/db').db;
// const _ = require('lodash');

const salt = Bcrypt.genSaltSync(10);

const importUser = (user, isAdmin, callback) => {
  const info = {
    name: user.name,
    cname: user.cname,
    password: Bcrypt.hashSync(user.password, salt),
    isAdmin: isAdmin
  };

  const key = user.username;
  const value = { info };

  if (!isAdmin) {
    const subjectPriority = {
      combos: [],
      oles: [0, 1, 2],
      isConfirmed: false
      // combos: _(46).range().shuffle().value(),
      // oles: _.shuffle([0, 1, 2]),
      // isConfirmed: true
    };
    value.subjectPriority = subjectPriority;
    info.classNo = user.classNo;
  }

  DB.put(key, value, function (err) {
    if (err) {
      return callback(err);
    } else {
      return callback(null, value);
    }
  });
};

module.exports = importUser;
