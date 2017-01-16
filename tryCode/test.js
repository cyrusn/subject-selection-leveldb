const _ = require('lodash');
const subjects = require('../json/subjects');


const subjectIDs = _.map(subjects, "id")
const emptyArray = _.fill(Array(subjectIDs.length), 0)
const noOfStudentInSubject = _.zipObject(subjectIDs, emptyArray)
console.log(noOfStudentInSubject)
