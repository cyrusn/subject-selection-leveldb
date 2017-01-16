import State from '../state';
import Fetch from 'isomorphic-fetch';
import { checkStatus, handleError, ListenAction, TriggerAction, createFetchOption } from './utils';
import { serverBase } from '../config';

/**
 * save capacity
 * @module ListenAction
*/
ListenAction('subjectCapacity:set', () => {
  const capacity = State.get().admin.allocation.subjectCapacity;
  const option = createFetchOption('post', capacity);

  Fetch(`${serverBase}/allocation/capacity`, option)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => {
      State
        .get()
        .admin
        .allocation
        .set('subjectCapacity', data);
    })
    .then(() => {
      TriggerAction('allocation:get');
    })
    .catch(handleError);
});

ListenAction('subjectCapacity:get', () => {
  const option = createFetchOption('get');

  Fetch(`${serverBase}/allocation/capacity`, option)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => {
      State
        .get()
        .admin
        .allocation
        .set('subjectCapacity', data);
    })
    .catch(handleError);
});
