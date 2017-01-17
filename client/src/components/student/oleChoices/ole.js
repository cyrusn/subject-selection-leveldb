// import React, { Component, PropTypes } from 'react';
// import State from '../../../state';
// import { oles } from '../../wrapper';
// import { DragSource, DropTarget } from 'react-dnd';
// import { TriggerAction } from '../../../reactions/utils';

// const oleSource = {
//   beginDrag (props) {
//     return {
//       id: props.ole.id,
//       index: props.ole.index
//     };
//   },

//   canDrag (props) {
//     return !State.get().subjectPriority.isConfirmed;
//   }
// };

// const oleTarget = {
//   drop (props, monitor, component) {
//     const dragItem = monitor.getItem();
//     const dropItem = props.ole;
//     TriggerAction('oles:move', dropItem.index, dragItem.index, dragItem.id);
//     TriggerAction('oles:save');
//   }
// };

// class Ole extends Component {
//   render () {
//     const {ole, isOver, isDragging, connectDragSource, connectDropTarget} = this.props;

//     const style = {
//       opacity: isDragging ? 0.5 : 1,
//       marginTop: '4px'
//     };

//     const Icon = isOver
//     ? (
//         <span
//           className='glyphicon glyphicon-circle-arrow-down' />
//       )
//     : (
//       <span className='glyphicon glyphicon-move' />
//     );

//     const index = ole.index;
//     return connectDragSource(
//         connectDropTarget(
//           <li style={style} >
//             <span className='hidden-print'>{Icon}{' '}</span>
//             <button className='btn btn-xs btn-warning'>
//               <span className='badge'>
//                 {index + 1}
//               </span>{' '}
//               {oles[ole.id].cname}
//             </button>
//           </li>
//        )
//       );
//   }
// }

// Ole.propTypes = {
//   ole: PropTypes.object,
//   isOver: PropTypes.bool,
//   connectDragSource: PropTypes.func,
//   connectDropTarget: PropTypes.func,
//   isDragging: PropTypes.bool
// };

// const Drag = DragSource('ole', oleSource, (connect, monitor) => {
//   return {
//     connectDragSource: connect.dragSource(),
//     isDragging: monitor.isDragging(),
//     canDrag: monitor.canDrag()
//   };
// })(Ole);

// const Drop = DropTarget('ole', oleTarget, (connect, monitor) => {
//   return {
//     connectDropTarget: connect.dropTarget(),
//     isOver: monitor.isOver()
//   };
// })(Drag);

// export default Drop;
