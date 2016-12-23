import State from '../state';
import Fetch from 'isomorphic-fetch';
import { checkStatus, handleError, ListenAction, createFetchOption } from './utils';
import { serverBase } from '../config';

/**
 * list all students data for school admin
 * @module ListenAction
*/
ListenAction('students:get', () => {
  const option = createFetchOption('get');

  Fetch(`${serverBase}/students`, option)
    .then(checkStatus)
    .then(response => response.json())
    .then(list => {
      State.get().admin.list.reset(list);
    })
    .catch(handleError);
});
