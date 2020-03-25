import axios from 'axios';
import { FETCH_USER } from './types';
import { SEARCH_RESTAURANT } from './types';

export const fetchUser = () =>  async (dispatch) => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSearchResults = (searchValue) => async (dispatch) => {
  const res = await axios.get(`/api/search/?term=${searchValue}`);
  dispatch({ type: SEARCH_RESTAURANT, payload: res.data });
}
