import {
  ADD_FRIEND,
  FETCH_FRIENDS_SUCCESS,
  REMOVE_FRIEND,
} from '../actions/actionTypes';

// const initialState = {
//   friends: [],
//   error: null,
// };
const initialState = [];

export default function posts(state = initialState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return [...action.friends];
    // case FETCH_FRIENDS_FAILED:
    //   return {
    //     ...state,
    //     error: true,
    //   };
    case ADD_FRIEND:
      return state.concat(action.friend);
    case REMOVE_FRIEND:
      const newArr = state.filter(
        (friend) => friend.to_user._id !== action.userId
      );
      return newArr;
    default:
      return state;
  }
}
