import State from '../state';
import Fetch from 'isomorphic-fetch';
import { checkStatus, handleError, ListenAction, createFetchOption, setLoaded } from './utils';
import initialState from '../state/initialState';
import { serverBase } from '../config';

/**
 * logout and reset initial state
 * @module ListenAction
 */
ListenAction('logout', () => {
  const option = createFetchOption('post');

  Fetch(`${serverBase}/auth/logout`, option)
    .then(checkStatus)
    .then(response => response.text())
    .then(() => State.get().reset(initialState))
    .then(setLoaded)
    .catch(handleError);
});
