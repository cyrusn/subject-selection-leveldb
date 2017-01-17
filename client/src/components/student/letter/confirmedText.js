import React, {Component} from 'react';
import {deadline} from '../../../config';
import DateFormatter from './chinese-date-formatter';
import 'moment/locale/zh-tw';

export default class ComfirmedText extends Component {
  render () {
    const formattedDeadline = new DateFormatter(new Date(deadline));
    return (
      <div>
        <h4 className='alert alert-danger hidden-print'>
          資料已被確定，同學必須列印此網頁，並於{formattedDeadline.fullDate}前簽妥並交回予班主任。
        </h4>
        <h4 className='alert alert-danger visible-print-block'>
          資料已被確定，請於{formattedDeadline.full}前簽回並交回予班主任。
        </h4>
      </div>
    );
  }
}
