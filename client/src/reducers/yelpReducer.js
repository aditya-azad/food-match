import { SEARCH_RESTAURANT } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case SEARCH_RESTAURANT:
      return action.payload || false;
    default:
      return state;
  }
}
