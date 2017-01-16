import { ListenAction } from './utils';
import Fetch from 'isomorphic-fetch';
import { checkStatus, handleError, TriggerAction, createFetchOption } from './utils';
import { serverBase } from '../config';
import State from '../state';

/**
 * toggle students' isConfirmed attribute
 * @module ListenAction
*/
ListenAction('unconfirm', (username) => {
  const option = createFetchOption('put');
  Fetch(`${serverBase}/student/${username}/priority/unconfirm`, option)
    .then(checkStatus)
    .then(response => response.text())
    .then(() => {
      TriggerAction('students:get');
    })
    .catch(handleError);
});

/**
 * set isConfirmed to true for student user
 * @module ListenAction
*/
ListenAction('confirm', () => {
  const state = State.get();
  const username = State.get().info.username;
  const option = createFetchOption('put');

  Fetch(`${serverBase}/student/${username}/priority/confirm`, option)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => {
      state.subjectPriority.set('isConfirmed', true);
    })
    .catch(handleError);
});
