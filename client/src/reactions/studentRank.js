import State from '../state';
import Fetch from 'isomorphic-fetch';
import { checkStatus, handleError, ListenAction, createFetchOption } from './utils';
import { serverBase } from '../config';

/**
 * save choices
 * @module ListenAction
*/
ListenAction('studentRank:set', (payload) => {
  Fetch(`${serverBase}/allocation/rank`, {
    method: 'post',
    credentials: serverBase ? 'include' : 'same-origin',
    body: payload
  })
    .then(checkStatus)
    .then(response => response.json())
    .then(data => {
      State
        .get()
        .admin
        .allocation
        .set('studentRank', data);
    })
    .catch(handleError);
});

ListenAction('studentRank:get', () => {
  const option = createFetchOption('get');

  Fetch(`${serverBase}/allocation/rank`, option)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => {
      State
        .get()
        .admin
        .allocation
        .set('studentRank', data);
    })
    .catch(handleError);
});
