import State from '../state';
import Fetch from 'isomorphic-fetch';
import { checkStatus, handleError, ListenAction, createFetchOption } from './utils';
import { serverBase } from '../config';

/**
 * edit State.get().subjectPriority.combos
 * @module ListenAction
 */
ListenAction('combos:push', (dragItemId) => {
  return State.get().subjectPriority.combos.push(dragItemId);
});

ListenAction('combos:remove', (dragItemIndex) => {
  return State.get().subjectPriority.combos.splice(dragItemIndex, 1);
});

ListenAction('combos:insert', (dropItemIndex, dragItemId) => {
  return State.get().subjectPriority.combos.splice(dropItemIndex, 0, dragItemId);
});

/**
 * save combos
 * @module ListenAction
*/
ListenAction('combos:save', () => {
  const username = State.get().info.username;
  const combos = State.get().subjectPriority.combos;
  const option = createFetchOption('put', {combos});

  Fetch(`${serverBase}/student/${username}/priority/combos`, option)
    .then(checkStatus)
    .then(response => {
      console.log('combos saved');
      return response.json();
    })
    .catch(handleError);
});
