import { combineReducers } from 'redux';
import authReducer from './authReducer';
import yelpReducer from './yelpReducer';

export default combineReducers({
  auth: authReducer,
  yelp: yelpReducer
});
