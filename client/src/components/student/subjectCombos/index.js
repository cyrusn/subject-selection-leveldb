import React, { Component } from 'react';
import SelectedCombos from './selectedCombos';
import RemainingCombos from './remainingCombos';
import Highlight from './highlight';
import State from '../../../state';
import ComfirmedText from '../letter/confirmedText';
import LetterHead from '../letter/letterHead';
import ReplyNotice from '../letter/replyNotice';

export default class SubjectCombos extends Component {
  render () {
    const {isConfirmed} = State.get().subjectPriority;

    return (
      <div>
        <div className='visible-print-block'>
          <LetterHead />
          <ReplyNotice />
        </div>
        <div className='container'>
          <h1>甲部：選修科目<small>（請按優次將選科意願排序。）</small></h1>
          {
            isConfirmed
            ? <ComfirmedText />
            : <div className='hidden-print'>
                <Highlight />
                <RemainingCombos />
              </div>
          }
          <SelectedCombos />
        </div>
        <div className='page-break'/>
        <div className='page-header hidden-print' />
      </div>
    );
  }
}
