import React, { Component } from 'react';
import {noticeCode} from '../../../config.json';
export default class LetterHead extends Component {
  render () {
    return (
        <div className='container-fluid'>
          <table width='100%' style={{fontSize: '80%'}}>
            <colgroup>
              <col style={{width: '40%'}} />
              <col style={{width: '20%'}} />
              <col style={{width: '40%'}} />
            </colgroup>
              <tbody>
                  <tr>
                      <td className='text-center' id='hello'>
                          <b style={{fontSize: '1.2em'}}>S.K.H. LI PING SECONDARY SCHOOL</b>
                          <small>
                          <br />450, WO YI HOP ROAD, TSUEN WAN, N.T.
                          <br />TEL : 2423-8806 {'  '}FAX : 2485-0734
                          <br /><a className='hidden-print' href='http://liping.edu.hk'>http://liping.edu.hk</a>
                          </small>
                      </td>
                      <td className='text-center'>
                          <img src='./images/sc_logo_bw.gif' style={{width: '45px'}} />
                      </td>
                      <td className='text-center'>
                          <b style={{fontSize: '2em'}}>聖 公 會 李 炳 中 學</b>
                          <br />
                          <small>新 界 荃 灣 和 宜 合 道 450 號</small>
                      </td>
                  </tr>
              </tbody>
          </table>
          <div className='container' style={{marginTop: '2em'}}>
            <p className='pull-right '>通 告 編 號：{noticeCode}</p>
          </div>
      </div>
    );
  }
}
