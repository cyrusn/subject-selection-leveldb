import React, { Component, PropTypes } from 'react';
import ListCombos from './listCombos';
import {length} from '../../wrapper';
import State from '../../../state';
import _ from 'lodash';

export default class RemainingCombos extends Component {
  render () {
    const {combos} = State.get().subjectPriority;
    const results = _.difference(_.range(length), combos);
    return (
      <div>
        <div className='hidden-print panel panel-danger'>
          <div className='panel-heading'>
            <h3 className='text-danger'>可供選擇科目組合</h3>
          </div>
          <div className='panel-body'>
            <ListCombos
              zone='remaining'
              contextualColor='danger'
              combos= {results} />
          </div>
        </div>
      </div>
    );
  }
}

RemainingCombos.propTypes = {
  combos: PropTypes.array,
  contextualColor: PropTypes.string,
  isConfirmed: PropTypes.bool
};

RemainingCombos.defaultProps = {
  combos: []
};
