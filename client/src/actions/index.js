import axios from 'axios';
import { FETCH_USER } from './types';
import { SEARCH_RESTAURANT_BY_NAME_LOCATION } from './types';

export const fetchUser = () =>  async (dispatch) => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSearchByNameLocationResults = () => async (dispatch) => {
  const res = await axios.get('/api/search');
  dispatch({ type: SEARCH_RESTAURANT_BY_NAME_LOCATION, payload: res.data });
}
