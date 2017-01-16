import State from '../state';
import { ListenAction, highlight } from './utils';

/**
 * highlight function for easier spot the subject
 * @module ListenAction
 */
ListenAction('highlight:toggle', (subject_code) => {
  const isHighlight = State.get().ui.highlight[subject_code];
  State.get().ui.highlight.set(subject_code, !isHighlight);
});

ListenAction('highlight:reset', () => {
  State.get().ui.set('highlight', highlight);
});
