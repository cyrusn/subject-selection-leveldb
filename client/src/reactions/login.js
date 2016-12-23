import Fetch from 'isomorphic-fetch';
import { checkStatus, ListenAction, TriggerAction, createFetchOption, setLoaded } from './utils';
import { serverBase } from '../config';

/**
 * login
 * @module ListenAction
 */
ListenAction('login', (user) => {
  const option = createFetchOption('post', user);

  Fetch(`${serverBase}/auth/login`, option)
    .then(checkStatus)
    .then(() => {
      TriggerAction('login:check', user.username);
    })
    .then(setLoaded)
    .catch((err) => {
      err.response.json()
        .then(json => window.alert(json.message));
    });
});
