import React, { Component } from 'react';
import State from '../../../state';
import { deliveryDate, isMock, mockTitle, title } from '../../../config.json';
import DateFormatter from 'chinese-date-formatter';
import 'moment/locale/zh-tw';
import Space from './constant/space';

export default class ReplyNotice extends Component {
  render () {
    const {info} = State.get();
    const {classNo, cname} = info;
    const formattedDeliveryDate = new DateFormatter(new Date(deliveryDate));

    return (
      <div className='container'>
        <h2 className='page-header text-center'>回條</h2>
        <p>
          敬覆者：頃接<Space />貴校{formattedDeliveryDate.full}來函，本人知悉有關{isMock ? mockTitle : title}事宜，以下為學生{classNo} {cname} 之{isMock ? '模擬' : ''}選科表。
        </p>
      </div>
    );
  }
}
