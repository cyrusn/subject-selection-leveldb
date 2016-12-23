import React from 'react';
import Combination from '../../../json/combination.json';
import Subjects from '../../../json/subjects.json';
import Oles from '../../../json/oles.json';
import _ from 'lodash';
import State from '../state';

/**
 * A wrapper function for combination.json, subjects.json and oles.json
 * @module Wrapper
 */

class Wrapper {
  constructor (combination, subjects, oles) {
    this.subjectColor = subjectColor;
    this.idToSpan = idToSpan.bind(this);
    this.combination = combination;
    this.subjects = subjects;
    this.oles = oles;
    this.length = combination.length;
  }
}

const subjectColor = {
  'bafs': 'GoldenRod',
  'bio': 'blue',
  'chem': 'Magenta',
  'chist': 'Crimson',
  'cscb': 'purple',
  'cscp': 'red',
  'econ': 'black',
  'geog': 'cyan',
  'hist': 'orange',
  'ict1': 'Navy',
  'ict2': 'OrangeRed',
  'phy': 'Salmon',
  'ths': 'brown',
  'va': 'Violet'
};

/**
 * Convert combination id to span component
 * index is the order of span
 * please ref bootstrap Contextual Colors for contextualColor
 * [contextual colors](http://getbootstrap.com/css/#helper-classes-colors)
*/
function idToSpan (index, _id, lang, contextualColor) {
  let subjectCnames = [];
  const {highlight} = State.get().ui;
  const combSubs = this.combination[_id].subjects;

  combSubs.forEach((sub) => {
    subjectCnames.push(convertSubjectCodeToText(sub, lang));
  });

  const highlightGp1 = {
    color: highlight[combSubs[0]] ? this.subjectColor[combSubs[0]] : null
  };

  const highlightGp2 = {
    color: highlight[combSubs[1]] ? this.subjectColor[combSubs[1]] : null
  };

  return (
  <button className={'btn btn-xs btn-' + contextualColor || 'default'} type='button'>
    <span className='badge'>
      {index + 1}
    </span>&nbsp;
    <span
      style={highlightGp1}>
      {subjectCnames[0]}
    </span> + <span
      style={highlightGp2}>
      {subjectCnames[1]}
    </span>
  </button>
  );
}

const convertSubjectCodeToText = (subject, lang) => {
  return _.result(
    _.find(Subjects, sub => sub.id === subject),
    lang
  );
};

module.exports = new Wrapper(Combination, Subjects, Oles);
