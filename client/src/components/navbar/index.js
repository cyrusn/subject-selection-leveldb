import React, { Component, PropTypes } from 'react';
import {title, mockTitle, isMock} from '../../config.json';
import { TriggerAction } from '../../reactions/utils';
import LogoutButton from './logoutButton';
import ConfirmButton from './confirmButton';
import State from '../../state';
import {length} from '../wrapper';
import Timer from '../timer';

class PleaseLogin extends Component {
  render () {
    return (
        <span>
          <span className='glyphicon glyphicon-envelope' /> 請先登入
        </span>
    );
  }
}

class WelcomeMessage extends Component {
  render () {
    const {info} = State.get();
    const {cname, classNo} = info;
    return (
      <span>
        <span className='glyphicon glyphicon-envelope' />{' '}
        {`${classNo || ''} ${cname} 已登入`}
      </span>
    );
  }
}

class PrintButton extends Component {
  render () {
    return (
      <button className='navbar-btn btn btn-info' onClick={window.print}>
        <span className='glyphicon glyphicon-print' />{' '}列印
      </button>
    );
  }
}

export default class Navbar extends Component {
  constructor (props) {
    super(props);
    this._onSetpage = this._onSetpage.bind(this);
  }

  _onSetpage (page) {
    TriggerAction('page:set', page);
  }

  render () {
    const {info, subjectPriority, ui} = State.get();
    const {page} = ui;
    const {isAdmin} = info;
    const {combos, isConfirmed} = subjectPriority;
    return (
      <nav className='navbar navbar-default navbar-fixed-top'>
        <div className='container-fluid' style={{width: '90%'}}>
          <div className='navbar-header'>
            <a className='navbar-brand' href='#'>
              {/* Brand Name*/}
              {isMock ? mockTitle : title}系統
            </a>
          </div>
          { page !== 'login'
            ? <div className='navbar-left'>
                <p className='navbar-text'>{page === 'student' ? <Timer /> : null}{'\n'}</p>
                {/* {'\n'} to preserve button margin */}
                <LogoutButton />{'\n'}
                { !isAdmin && !isConfirmed
                  ? <ConfirmButton canConfirm={combos.length === length} />
                  : null
                }{'\n'}
                {
                  isAdmin
                  ? <span>
                      <button
                        className='navbar-btn btn btn-primary'
                        onClick={this._onSetpage.bind(null, 'list')}>
                        <span className='glyphicon glyphicon-list-alt'/>{' '}
                        列表
                      </button>{'\n'}
                      <button
                        className='navbar-btn btn btn-success'
                        onClick={this._onSetpage.bind(null, 'allocate')}>
                        <span className='glyphicon  glyphicon-export'/>{' '}
                        分科
                      </button>{'\n'}
                    </span>
                  : null
                }
                <PrintButton />{'\n'}
              </div>
            : null }
          <p className='navbar-text navbar-right'>
            {page !== 'login' ? <WelcomeMessage /> : <PleaseLogin />}
          </p>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  isLogin: PropTypes.bool,
  isConfirmed: PropTypes.bool,
  data: PropTypes.object
};

Navbar.defaultProps = {
  isLogin: false,
  data: {}
};
