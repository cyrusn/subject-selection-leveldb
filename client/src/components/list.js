import React, { Component } from 'react';
import { TriggerAction } from '../reactions/utils';
import {serverBase} from '../config';
import State from '../state';

export default class List extends Component {
  constructor (props) {
    super(props);
    this.state = {
      filter: 0
    };
    this._onFilter = this._onFilter.bind(this);
  }

  _onFilter () {
    this.setState({
      filter: (this.state.filter + 1) % 3
    });
  }
  _onUnconfirm (username) {
    TriggerAction('unconfirm', username);
  }

  render () {
    const {list} = State.get().admin;
    // toggle for showing all, confirmed and not yet confirm
    const filterValue = (value) => {
      switch (value) {
        case 0:
          return 'Show All';
        case 1:
          return 'Show Confirmed Only';
        case 2:
          return 'Show Not Confirmed Only';
      }
    };

    return (
      (list)
      ? <div className='container'>
          <h1>Admin Page <small>{filterValue(this.state.filter)}</small></h1>
          <p className='btn-group'>
            <a className='btn btn-default' href={`${serverBase}/students/export/csv`}>下載 CSV</a>
            <a className='btn btn-default' href={`${serverBase}/students/export/json`}>下載 JSON</a>
            <button className='btn btn-default' onClick={this._onFilter}>Toggle Filter</button>
          </p>
          <div>
            <table className='table table-hover table-condensed'>
              <tbody>
                <tr>
                  <th>登入編號</th>
                  <th>英文姓名</th>
                  <th>中文姓名</th>
                  <th>班別學號</th>
                  <th>確定</th>
                  <th>更改確定</th>
                </tr>
                {
                  list
                  .filter((student, i) => {
                    // console.log(student);
                    const {isConfirmed} = student.subjectPriority;
                    switch (this.state.filter) {
                      case 0:
                        return true;
                      case 1:
                        return isConfirmed;
                      case 2:
                        return !isConfirmed;
                    }
                  })
                  .map((student, i) => {
                    const {info, subjectPriority} = student;
                    const {username, name, cname, classNo} = info;
                    const {isConfirmed} = subjectPriority;
                    return (
                      <tr key={i}>
                        <td>{username}</td>
                        <td>{name}</td>
                        <td>{cname}</td>
                        <td>{classNo}</td>
                        <td>{isConfirmed ? <span className='glyphicon glyphicon-ok' /> : <span className='glyphicon glyphicon-remove' style={{color: 'red'}}/>}</td>
                        <td>
                          <button
                            className='btn btn-default'
                            onClick={this._onUnconfirm.bind(null, username)}>
                            {(isConfirmed) ? 'Release' : 'Confirm'}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      : null
    );
  }
}
