module.exports = {
  info: {
    username: '',
    name: '',
    cname: '',
    isAdmin: false,
    classNo: ''
  },
  subjectPriority: {
    combos: [],
    oles: [],
    isConfirmed: false
  },
  admin: {
    allocation: {
      subjectCapacity: {
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
      },
      studentRank: [],
      result: []
    },
    list: []
  },
  ui: {
    page: 'login',
    isLoading: true,
    highlight: {},
    timer: 30 * 60 * 1000
  }
};
