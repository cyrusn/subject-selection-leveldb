import State from '../state';
import Fetch from 'isomorphic-fetch';
import { checkStatus, handleError, ListenAction, TriggerAction, createFetchOption, setLoaded } from './utils';
import { serverBase } from '../config';

/**
 * login
 * @module ListenAction
 */

ListenAction('login:check', (username) => {
  const option = createFetchOption('get');
  Fetch(`${serverBase}/user/${username}/info`, option)
    .then(checkStatus)
    .then(response => response.json())
    .then(getUserInfo)
    .then(setCustomState)
    .then(setLoaded)
    .catch(handleError);
});

const getUserInfo = (data) => {
  State.get()
    .set('info', Object.assign(data.value.info, {username: data.key}));

  return data.value;
};

const setCustomState = (value) => {
  // set ui page to 'list'
  if (value.info.isAdmin) {
    TriggerAction('students:get');
    TriggerAction('page:set', 'list');
  } else {
    State.get()
      .set('subjectPriority', value.subjectPriority);
    // set ui page to 'student'
    TriggerAction('highlight:reset');
    TriggerAction('page:set', 'student');
  }
  return;
};
