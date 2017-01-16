import React, { Component } from 'react';
import { schoolName } from '../config.json';
import { TriggerAction } from '../reactions/utils';

export default class Login extends Component {
  constructor (props) {
    super(props);
    this._onClick = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  _onClick () {
    TriggerAction('login', {
      username: this.refs.username.value,
      password: this.refs.password.value
    });
  }

  _onKeyDown (e) {
    if (e.keyCode === 13) this._onClick();
  }

  render () {
    const style = {
      width: '60%',
      marginTop: '4vh'
    };

    return (
    <div className='container' style={{width: '80%'}} >
      <div className='text-center'>
        <h1 className='page-header'>{schoolName}</h1>
      </div>
      <div
        style={style}
        className='text-center center-block'>
        <form role='form'>
          <div className='form-horizontal'>
            <div className='form-group'>
              <label className='control-label col-sm-3'>
                <p>登入編號</p>
              </label>
              <div className='col-sm-9'>
                <input
                  className='form-control'
                  type='text'
                  ref = 'username'
                  autoFocus
                  defaultValue=''
                  onKeyDown={this._onKeyDown} />
              </div>
            </div>
            <div className='form-group'>
              <label className='control-label col-sm-3'>密碼</label>
              <div className='col-sm-9'>
                <input
                  className='form-control'
                  type='password'
                  ref = 'password'
                  defaultValue=''
                  onKeyDown={this._onKeyDown} />
              </div>
            </div>
            <div className='form-group'>
              <div className='col-sm-3'></div>
              <div className='col-sm-9 text-left'>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={this._onClick}>
                <span className='glyphicon glyphicon-log-in'></span> 登入
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    );
  }
}
