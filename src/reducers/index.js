import { combineReducers } from 'redux';
import posts from './posts';
import profile from './profile';
import friends from './friends';

import auth from './auth';

export default combineReducers({
  posts,
  auth,
  profile,
  friends,
});
