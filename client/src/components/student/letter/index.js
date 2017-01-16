import React, { Component } from 'react';
import LetterHead from './letterHead';
import LetterBody from './letterBody';

export default class Intro extends Component {
  render () {
    return (
      <div>
        <LetterHead />
        <LetterBody />
        <div className='page-break' />
        <div className='page-header hidden-print' />
      </div>
    );
  }
}
