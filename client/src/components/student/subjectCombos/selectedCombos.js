import React, { Component } from 'react';
import ListCombos from './listCombos';
import State from '../../../state';

class SelectedCombos extends Component {
  render () {
    const {combos, isConfirmed} = State.get().subjectPriority;
    return (
      <div>
        <div className='panel panel-info'>
          <div className='panel-heading'>
            <h3>已{isConfirmed ? '確定' : '選擇的'}選科次序
              <small className='text-info hidden-print'>
                {'  '}（請將以上選科項目拖到以下方格內，並按優次將選科意願排序。）
              </small>
            </h3>
          </div>
          <div className='panel-body'>
            <ListCombos
              zone='selected'
              contextualColor='info'
              isConfirmed={isConfirmed}
							combos= {combos}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SelectedCombos;
