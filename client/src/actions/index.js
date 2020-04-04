import axios from 'axios';
import { FETCH_USER } from './types';
import { SEARCH_RESTAURANT } from './types';

export const fetchUser = () =>  async (dispatch) => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSearchResults = (name, ...location) => async (dispatch) => {
  let res;
  if (location.length === 2) { // use geolocation
    res = await axios.get(`/api/search/?term=${name}&latitude=${location[0]}&longitude=${location[1]}`);
  } else if (location.length === 1) { // user provided a location
    res = await axios.get(`/api/search/?term=${name}&location=${location[0]}`);
  } else { // use SF as default location
    res = await axios.get(`/api/search/?term=${name}&location=sf`);
  }
  dispatch({ type: SEARCH_RESTAURANT, payload: res.data });
}
