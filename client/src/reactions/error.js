import {ListenAction} from './utils';

ListenAction('error', (response) => {
  response.json()
  .then(json => {
    console.log(json);
  });
});
