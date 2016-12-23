const Path = require('path');
const studentRankFilePath = Path.resolve(__dirname, '../upload/', 'studentRank.json');
const subjectCapacityFilePath = Path.resolve(__dirname, '../upload/', 'subjectCapacity.json');
const allocationFilePath = Path.resolve(__dirname, '../upload/', 'allocation.json');

// DONE:
// we can use path to denote file/File path
// you can be more specific by using `FilePath`, `FilePath`
// you can use `path.dirname(p)` to get the File from a FilePath
// so you only have to specify the FilePath for the latter four
module.exports = {
  studentRankFilePath,
  subjectCapacityFilePath,
  allocationFilePath
};
