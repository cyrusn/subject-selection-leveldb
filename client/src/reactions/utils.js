import State from '../state';
import { serverBase } from '../config';

const ListenAction = State.on.bind(State);

const TriggerAction = State.trigger.bind(State);
TriggerAction.functor = function (...args) {
  return State.trigger.bind(State, ...args);
};

// checkstatus on Fetch, return json object
const checkStatus = (response) => {
  // leesei: use !== 200?
  // Will Fetch follow redirect automatically?
  if (response.status !== 200) {
    const error = new Error(response.statusText);
    error.response = response;
    setLoaded();
    // throw error;
    return Promise.reject(error);
  }
  return response;
};

// leesei: could be replaced by `TriggerAction.functor('error', err)` in the caller
const handleError = (err) => {
  err.response.json()
    .then(json => console.log(json.message));
};

const highlight = {
  'bafs': false,
  'bio': false,
  'chem': false,
  'chist': false,
  'cscb': false,
  'cscp': false,
  'econ': false,
  'geog': false,
  'hist': false,
  'ict1': false,
  'ict2': false,
  'phy': false,
  'ths': false,
  'va': false
};

const createFetchOption = (method, body) => {
  const option = {method};

  // add header for put and post method
  if (method === 'put' || method === 'post') {
    option.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    // add body for put and post method
    if (body) option.body = JSON.stringify(body);
  }

  // if serverBase in config.json
  // is a non-empty string (a serverbase address)
  // then will use cors
  // ref: https://github.com/github/fetch#sending-cookies
  option.credentials = serverBase ? 'include' : 'same-origin';
  return option;
};

const setLoaded = (data) => {
  State.get().ui.set('isLoading', false);
  if (data) return data;
};

module.exports = {
  checkStatus,
  handleError,
  ListenAction,
  TriggerAction,
  highlight,
  createFetchOption,
  setLoaded
};
