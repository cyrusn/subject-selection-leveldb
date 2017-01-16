const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;
const expect = Code.expect;

// test framework:
// https://github.com/hapijs/lab
// assertion:
// https://github.com/hapijs/code/blob/master/API.md
// util lib used by Code:
// https://github.com/hapijs/hoek

const allocateHelper = require('../utils/allocateHelper');

describe('suite description', () => {

  // test success cases then edge cases
  // coverage will help you catch edge cases (if branches)

  // tests:
  // trivial case (cap > students)
  // no students
  // no ranks
  // no capacities
  // student without rank
  // student not confirmed
  it('should successfully allocate for cap > students', (done) => {
    // come up with simple data
    const students = {
    };
    const ranks = {
    };
    const capacities = {
    };

    allocateHelper(students, ranks, capacities, (err, result) => {
      expect(result).to.deep.equal({});
      done();
    });
  });

  it('should return err/empty result on empty input', (done) => {
    // copy from above for controlled test
    const students = {
    };
    const ranks = {
    };
    const capacities = {
    };

    allocateHelper({}, ranks, capacities, (err, result) => {
      expect(result).to.deep.equal({});
      done();
    });

    allocateHelper(students, {}, capacities, (err, result) => {
      expect(result).to.deep.equal({});
      done();
    });

    allocateHelper(students, ranks, {}, (err, result) => {
      expect(result).to.deep.equal({});
      done();
    });
  });

  it('student without rank', (done) => {
    // copy from above for controlled test
    // tweak to satisfy test case
    const students = {
    };
    const ranks = {
    };
    const capacities = {
    };

    allocateHelper(students, ranks, capacities, (err, result) => {
      expect(result).to.deep.equal({});
      done();
    });
  });
});
