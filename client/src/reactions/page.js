import State from '../state';
import { ListenAction } from './utils';

/**
 * edit State.get().ui.page
 * @module ListenAction
 */
ListenAction('page:set', (page) => {
  State.get().ui.set('page', page);
  return;
});
