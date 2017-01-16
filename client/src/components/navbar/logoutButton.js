import React, { Component } from 'react';
import { TriggerAction } from '../../reactions/utils';

export default class LogoutButton extends Component {
  _onClick () {
    TriggerAction('logout');
  }

  render () {
    return (
      <button
        className='navbar-btn btn btn-warning'
        onClick={this._onClick}>
        <span className='glyphicon glyphicon-log-out' />{' '}登出
      </button>
    );
  }
}
