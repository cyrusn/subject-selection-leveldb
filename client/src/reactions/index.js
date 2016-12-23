// if we cannot get file list within browserify,
// we can generate this file in build procedure
// Material UI is doing this:
// https://github.com/callemall/material-ui/blob/master/src/svg-icons/index-generator.js
//
// Better (remove non-reactions from reactions/):
// http://stackoverflow.com/questions/21642398/compiling-dynamically-required-modules-with-browserify

import './allocation';
import './combos';
import './confirm';
import './highlight';
import './list';
import './login';
import './logout';
import './oles';
import './page';
import './studentRank';
import './subjectCapacity';
import './getUserInfo';
import './error';
