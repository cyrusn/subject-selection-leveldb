import React, { Component } from 'react';
import {TriggerAction} from '../../reactions/utils';
import State from '../../state';
import _ from 'lodash';

export default class InputForm extends Component {
  constructor (props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }
  componentDidMount () {
    TriggerAction('studentRank:get');
  }

  _onClick () {
    const {studentRank} = this.refs;
    const payload = new FormData();

    payload.append('rank', studentRank.files[0]);
    TriggerAction('studentRank:set', payload);
  }

  render () {
    const {studentRank} = State.get().admin.allocation;
    return (
      <div className='row'>
        <div className={`alert alert-${_.isEmpty(studentRank) ? 'danger' : 'success'}`}>
          {_.isEmpty(studentRank) ? 'Please upload a valid studentRank.csv' : 'studentRank.csv is uploaded'}
        </div>
        <div className='class="form-group"'>
          <label>Upload studentRank.csv <a href='./studentRank.csv' target='_blank'>(download demo)</a></label>
          <input type='file' ref='studentRank' />{'\n'}
          <button onClick={this._onClick} className='btn btn-default'>Submit</button>
        </div>
        <hr/>
      </div>
    );
  }
}
