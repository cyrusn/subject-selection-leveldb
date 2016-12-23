import React, { Component, PropTypes } from 'react';
import { subjects, subjectColor } from '../../wrapper';
import { TriggerAction } from '../../../reactions/utils';
import _ from 'lodash';
import State from '../../../state';

export default class Highlight extends Component {

  _onClick (subject_code) {
    TriggerAction('highlight:toggle', subject_code);
  }

  _onReset () {
    TriggerAction('highlight:reset');
  }

  render () {
    const {highlight} = State.get().ui;

    const {group1, group2} = _(subjects)
      .groupBy('group')
      .mapKeys((value, key) => 'group' + key)
      .value();

    const listGroup = group => {
      return group.map((obj, i) => {
        const showColor = highlight[obj.id] ? subjectColor[obj.id] : null;
        let style = {
          borderColor: showColor,
          color: showColor
        };
        return (
          <td key={i}>
            <button
              className='btn btn-default'
              style={style}
              onClick={this._onClick.bind(null, obj.id)}>
              {obj.cname}
            </button>
          </td>
        );
      });
    };
    return (
      highlight
      ? <div>
          <button
            className='btn btn-default'
            style={{backgroundColor: 'white', marginBottom: '6px'}}
            onClick={this._onReset}>
            重置顏色
          </button>
          <table className='table' style={{textAlign: 'center'}}>
            <tbody>
              <tr>
                <th>第一組</th>
                {listGroup(group1)}
              </tr>
              <tr>
                <th>第二組</th>
                  {listGroup(group2)}
                </tr>
            </tbody>
          </table>
        </div>
      : null
    );
  }
}

Highlight.propTypes = {
  highlight: PropTypes.object
};
