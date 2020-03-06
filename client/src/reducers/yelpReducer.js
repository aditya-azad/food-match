import { SEARCH_RESTAURANT_BY_NAME_LOCATION } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case SEARCH_RESTAURANT_BY_NAME_LOCATION:
      return action.payload || false;
    default:
      return state;
  }
}
