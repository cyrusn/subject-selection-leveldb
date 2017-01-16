import React, { Component } from 'react';
import { committeeInCharge, committeeWebsite, schoolName } from '../config.json';

export default class Footer extends Component {
  render () {
    return (
      <nav className='navbar navbar-default navbar-fixed-bottom'>
        <div className='container-fluid' style={{width: '95%'}}>
          <div className='pull-right'>
            <p className='navbar-text'>
              <a href={committeeWebsite} target='_blank'>
                {committeeInCharge}
              </a>
            </p>
            <div className='navbar-header'>
            <div className='navbar-brand'>
              {schoolName}
            </div>
          </div>
          </div>
        </div>
      </nav>
    );
  }
}
