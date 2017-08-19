import React, { Component, PropTypes } from 'react';
import Combo from './combo';
import { length } from '../../wrapper';

class ListCombos extends Component {

  render () {
    // combos is an array of number from 0 to 45;
    const {combos, zone, contextualColor, isConfirmed} = this.props;
    return (
      <div>
        <ul className='list-inline'>
          {combos.map((combo, i) => {
            return (
              <Combo
                key={i}
                combo={{id: combo, index: i}}
                zone={zone}
								isConfirmed={isConfirmed}
								contextualColor={contextualColor} />
            );
          })}
          <Combo zone={zone} combo={{index: length}} />
        </ul>
      </div>
    );
  }
}

ListCombos.propTypes = {
  combos: PropTypes.array,
  zone: PropTypes.string,
  contextualColor: PropTypes.string
};

ListCombos.defaultProps = {
  combos: [],
  zone: '',
  contextualColor: 'default'
};

export default ListCombos;
