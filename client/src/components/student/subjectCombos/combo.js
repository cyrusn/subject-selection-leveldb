import React, { Component, PropTypes } from 'react';
import { idToSpan, length } from '../../wrapper';
import { DragSource, DropTarget } from 'react-dnd';
import { TriggerAction } from '../../../reactions/utils';
import State from '../../../state';

const comboSource = {
  beginDrag (props) {
    return {
      zone: props.zone,
      combo: {
        id: props.combo.id,
        index: props.combo.index
      }
    };
  },

  canDrag (props) {
    return !State.get().subjectPriority.isConfirmed;
  }
};

const comboTarget = {
  drop (props, monitor, component) {
    const dragItem = monitor.getItem();
    const dropItem = props;
    if (dragItem.zone === 'remaining' && dropItem.zone === 'remaining') return;

    switch (true) {
      case (dragItem.zone === 'remaining' && dropItem.zone === 'selected'):
        if (!props.combo || dropItem.combo.index === length) {
          TriggerAction('combos:push', dragItem.combo.id);
          break;
        }

        TriggerAction('combos:insert', dropItem.combo.index, dragItem.combo.id);
        break;

      case (dragItem.zone === 'selected' && dropItem.zone === 'selected'):
        TriggerAction('combos:remove', dragItem.combo.index);

        if (dropItem.combo.index !== length) {
          TriggerAction('combos:insert', dropItem.combo.index, dragItem.combo.id);
          break;
        }

        TriggerAction('combos:push', dragItem.combo.id);
        break;

      default:
        TriggerAction('combos:remove', dragItem.combo.index);
        break;
    }

    TriggerAction('combos:save');
  }
};

class Combo extends Component {
  render () {
    const { contextualColor, isOver, isDragging, connectDragSource, connectDropTarget, combo } = this.props;

    const style = {
      opacity: isDragging ? 0.5 : 1,
      marginTop: '4px',
    };

    const Icon = (isOver)
    ? <span className='glyphicon glyphicon-circle-arrow-down' />
    : <span className='glyphicon glyphicon-move' />;

    if (combo.id === undefined) {
      return (
        connectDropTarget(
          <li style={{style}} className='hidden-print col-md-3 col-xs-3'>
            {(isOver) ? (
              <span className='glyphicon glyphicon-circle-arrow-down' />
              ) : null } &nbsp;&nbsp;&nbsp;&nbsp;
          </li>
        )
      );
    }

    return (
      connectDragSource(
        connectDropTarget(
          <li style={style} className='col-md-3 col-xs-3'>
            <span className='hidden-print'>{Icon}{' '}</span>
            {idToSpan(combo.index, combo.id, 'slug', contextualColor)}
          </li>
       )
      )
    );
  }
}

Combo.propTypes = {
  contextualColor: PropTypes.string,
  zone: PropTypes.string,
  combo: PropTypes.object,
  isConfirmed: PropTypes.bool,
  isOver: PropTypes.bool,
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,
  isDragging: PropTypes.bool
};

Combo.defaultProps = {
  combo: null
};

const Drag = DragSource('combos', comboSource, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    canDrag: monitor.canDrag()
  };
})(Combo);

const Drop = DropTarget('combos', comboTarget, (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
})(Drag);

export default Drop;
