import { combineReducers } from 'redux';
import usersReducer from './users';
import entriesReducer from './entries';

export default combineReducers({
  user: usersReducer,
  entries: entriesReducer
})