import React, {Component} from 'react';
import DateFormatter from './chinese-date-formatter';
import {
  committeeInCharge,
  committeeWebsite,
  mockTitle,
  title,
  deadline,
  pics,
  committeeHead,
  deliveryDate,
  isMock
} from '../../../config.json';

import Space from './constant/space';
import Tab from './constant/tab';

export default class LetterBody extends Component {
  render () {
    const displayLinks = (link) => {
      return <span>
        <a className='hidden-print' href={link} target='_blank'>{link}</a>
        <span className='visible-print-inline'>{link}</span>
      </span>;
    };
    const formattedDeadline = new DateFormatter(new Date(deadline));
    const formattedDeliveryDate = new DateFormatter(new Date(deliveryDate));

    return (
      <div className='container' style={{marginTop: '12px'}}>
        <div className='container-fluid'>
          <p>敬啟者：</p>
          <h2 className='text-center'>有關{isMock ? mockTitle : title}事宜</h2>
          <p>
            <Tab />
            本校於下學年中四級將開設12個選修科目，除核心科目外（中國語文、英國語文、數學及通識教育），每位同學須修讀兩個選修科目及一個其他學習經歷科目。
            {isMock ? `為協助同學了解${title}程序及讓學校了解同學選科之意向，同學須在正式選科前進行模擬選科。` : null }現請同學因應自己的學習能力、升學目標及興趣等因素，選擇選修科目。同學填表時須審慎認真，並留意下列要點：
          </p>

          <ul>
            <li>
              由於各科學額及學校資源有限，選修科將按同學全年成績優次編配；
            </li>
            <li>
              學校在編排選修科目組別時會考慮同學日後出路及興趣，務求滿足大部份同學的意願，唯由於學額、教師數目、學校設備等有限，學校未必能滿足全部同學的意願；
            </li>
            { isMock ? null : <li>選修科分派後難以更改，因會直接影響其他同學獲分派的學科，故務必審慎選科；</li> }
            <li>
              除核心科目、選修科目及其他學習經歷科目外，升讀中五時同學可申請修讀應用學習課程及數學延伸單元，報讀詳情將於中四級上學期另行通知；
            </li>
            <li>同學應先閱讀中三生涯規劃手冊《我自求我道》及參考本校{committeeInCharge}網頁（{displayLinks(committeeWebsite)}）相關資料。
            </li>
          </ul>

          <p>
          <Tab />
          同學必須完成網上{isMock ? '模擬' : null}選科，將本選科表列印後交家長簽署，並於{formattedDeadline.simple}或之前交予班主任。如有疑問，請向{committeeInCharge}{pics[0]}老師或{pics[1]}老師查詢。耑此<Space />函達，敬希<Space />垂察！
          </p>
        </div>
        <div className='container-fluid'>
          <p style={{marginLeft: '2em'}}>
            此致
          </p>
          <p>中三級學生家長及學生</p>
        </div>

        <div className='container-fluid'>
            <div className='text-right pull-right'>
                聖公會李炳中學校長<br />
                彭君華謹啟
                <br/>({committeeHead}老師代行)
            </div>
        </div>
        <div className='container-fluid'>
            <div className='pull-left'>
                <br/>{formattedDeliveryDate.full}
            </div>
        </div>
      </div>
    );
  }
}

