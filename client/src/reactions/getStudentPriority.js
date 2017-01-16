import State from '../state';
import Fetch from 'isomorphic-fetch';
import { checkStatus, handleError, ListenAction, TriggerAction, createFetchOption, setLoaded } from './utils';
import { serverBase } from '../config';

/**
 * login
 * @module ListenAction
 */

ListenAction('priority:get', (username) => {
  const option = createFetchOption('get');
  Fetch(`${serverBase}/student/${username}/priority`, option)
    .then(checkStatus)
    .then(response => response.json())
    .then(setCustomState)
    .then(setLoaded)
    .catch(handleError);
});

const setCustomState = (value) => {
  State.get()
    .set('subjectPriority', value.subjectPriority);
  return;
};
