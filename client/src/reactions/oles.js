// import State from '../state';
// import Fetch from 'isomorphic-fetch';
// import { checkStatus, handleError, ListenAction, createFetchOption } from './utils';
// import { serverBase } from '../config';

// /**
//  * edit State.get().subjectPriority.oles
//  * @module ListenAction
//  */
// ListenAction('oles:move', (dropItemIndex, dragItemIndex, dragItemId) => {
//   State.get().subjectPriority.oles.splice(dragItemIndex, 1);
//   State.get().subjectPriority.oles.splice(dropItemIndex, 0, dragItemId);
//   return;
// });

// /**
//  * save oles
//  * @module ListenAction
// */
// ListenAction('oles:save', () => {
//   const username = State.get().info.username;
//   const oles = State.get().subjectPriority.oles;
//   const option = createFetchOption('put', {oles});

//   Fetch(`${serverBase}/student/${username}/priority/oles`, option)
//     .then(checkStatus)
//     .then(response => {
//       console.log('oles saved');
//       return response.json();
//     })
//     .catch(handleError);
// });
