import React, {Component} from 'react';
import State from '../../../state';
import Config from '../../../config';
import DateFormatter from './chinese-date-formatter';

import Tab from './constant/tab';

export default class SignArea extends Component {
  render () {
    const style = {
      width: '60%',
      textAlign: 'center',
      borderBottom: '1px solid'
    };

    const {info} = State.get();
    const {cname, name} = info;
    const formattedReturnYear = new DateFormatter(new Date(Config.returnYear));

    return (
      <div className='visible-print-block container'>
        <div className='row'>
          <p>
          <Tab />此覆
          </p>
          <p>聖公會李炳中學校長</p>
        </div>
        <div className='row'>
          <div>
            <table className='pull-right' style={{width: '40%'}}>
              <tbody>
                <tr>
                  <td>班別學號:</td>
                  <td style={style}>{name}</td>
                </tr>
                <tr>
                  <td>姓名:</td>
                  <td style={style}>{cname}</td>
                </tr>
                <tr>
                  <td>家長簽名:</td>
                  <td style={style}>
                    <br />
                    <br />
                    <br />
                  </td>
                </tr>
                <tr>
                  <td>通告編號：</td>
                  <td style={style}>
                    {Config.noticeCode}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='row'>
          <div className='pull-left'>
            {formattedReturnYear.year}
            <span style={{marginLeft: '24px'}}>月{''}</span>
            <span style={{marginLeft: '24px'}}>日{''}</span>
          </div>
        </div>
      </div>
    );
  }
}

