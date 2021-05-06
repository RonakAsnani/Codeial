import { combineReducers } from 'redux';
import posts from './posts';
import profile from './profile';

import auth from './auth';

export default combineReducers({
  posts,
  auth,
  profile,
});
