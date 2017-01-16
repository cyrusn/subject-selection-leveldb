import State from '../state';
import Fetch from 'isomorphic-fetch';
import { checkStatus, ListenAction, createFetchOption } from './utils';
import { serverBase } from '../config';

ListenAction('allocation:get', () => {
  const option = createFetchOption('get');
  Fetch(`${serverBase}/allocation/result/statistic`, option)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      State
        .get()
        .admin
        .allocation
        .result
        .reset(data);
    })
    .catch(err => {
      State
        .get()
        .admin
        .allocation
        .result
        .reset([]);
      return err.response.json();
    })
    .then(err => {
      console.log(err);
    });
});
