import React, { Component } from 'react';
import Capacity from './capacity';
import Rank from './rank';
import State from '../../state';
import {serverBase} from '../../config';

const subjects = {
  'group1': ['phy', 'bio', 'bafs', 'chist', 'ths', 'ict1', 'va'],
  'group2': ['chem', 'cscb', 'cscp', 'econ', 'hist', 'geog', 'ict2']
};

export default class Allocate extends Component {
  render () {
    const {result} = State.get().admin.allocation;
    const {noOfStudent, fullSubjectsList, noOfStudentInSubject, subjectCapacity} = result;

    const createGroupStatisticTable = (groupName) => {
      return (
        <ul className='list-group'>
          {
            subjects[groupName].map((sub, key) => {
              return <li className='list-group-item' key={key}>
                {sub}
                <span className='badge'>{noOfStudentInSubject[sub]} / {subjectCapacity[sub]}</span>
              </li>;
            })
          }
        </ul>
      );
    };

    const groups = ['group1', 'group2'];
    return (
      <div className='container'>
        <Rank />
        <div className='row'>
          <Capacity />{'\n'}
          <div className='col-sm-6 pull-right'>
          {
            result.noOfStudent
            ? <div>
              <label>Total No of Student: {noOfStudent}</label>
              <ul className='list-inline'>
              {
                fullSubjectsList.map((sub, index) => {
                  return (
                    <span key={index}>
                      <span className='label label-success'>{sub}</span>{' '}
                    </span>
                  );
                })
              }
              </ul>
              {
                groups.map((gp, key) => {
                  return (
                    <div className='form-horizontal col-sm-6' key={key}>
                      <h4>{gp}</h4>
                      { createGroupStatisticTable(gp) }
                    </div>
                  );
                })
              }
              <a className='btn btn-success' href={`${serverBase}/allocation/result/students`}>Download Student Result</a>
            </div>
            : null
          }
        </div>
      </div>
    </div>
    );
  }
}
