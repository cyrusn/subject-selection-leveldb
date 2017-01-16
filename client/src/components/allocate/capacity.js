import React, { Component } from 'react';
import {TriggerAction} from '../../reactions/utils';
import State from '../../state';

const subjects = {
  'group1': ['phy', 'bio', 'bafs', 'chist', 'ths', 'ict1', 'va'],
  'group2': ['chem', 'cscb', 'cscp', 'econ', 'hist', 'geog', 'ict2']
};

export default class Capacity extends Component {
  componentDidMount () {
    TriggerAction('subjectCapacity:get');
  }
  constructor (props) {
    super(props);
    this._onClick = this._onClick.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  _onKeyDown (e) {
    if (e.keyCode === 13) this._onClick();
  }
  _onChange () {
    const capacity = {};
    const allSubjects = [...subjects.group1, ...subjects.group2];
    allSubjects.forEach(sub => {
      capacity[sub] = parseInt(this.refs[sub].value, 10);
    });
    State.get().admin.allocation.set('subjectCapacity', capacity);
  }

  _onClick () {
    TriggerAction('subjectCapacity:set');
  }

  render () {
    const {allocation} = State.get().admin;
    const {subjectCapacity} = allocation;

    const createGroupInputForm = (groupName) => {
      return subjects[groupName].map((sub, key) => {
        return (
          <div key={key} className='form-group'>
            <label className='col-sm-2 control-label'>{sub}</label>
            <div className='col-sm-6'>
              <input
                className='form-control col-sm-1'
                type='number'
                ref={sub}
                onKeyDown={this._onKeyDown}
                onChange={this._onChange}
                value={subjectCapacity[sub]} />{' '}
            </div>
          </div>
        );
      });
    };

    const groups = ['group1', 'group2'];
    return (
      <div className='col-sm-6' encType='multipart/form-data' >
      <h2>Please enter Subject Capacity</h2>
      {
        groups.map((gp, key) => {
          return (
            <div className='form-horizontal col-sm-6' key={key}>
              <h4>{gp}</h4>
              { createGroupInputForm(gp) }
            </div>
          );
        })
      }
      <button className='btn btn-default' onClick={this._onClick}>Submit</button> {'\n'}
      </div>
    );
  }
}
