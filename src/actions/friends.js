import { APIUrls } from '../helpers/urls';
import {
  FETCH_FRIENDS_SUCCESS,
  ADD_FRIEND,
  REMOVE_FRIEND,
} from './actionTypes';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
export function fetchFriendsSuccess(friends) {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    friends,
  };
}
// export function fetchFriendsFailed(message) {
//   return {
//     type: FETCH_FRIENDS_FAILED,
//     message,
//   };
//}

export function fetchUserFriends(userId) {
  //console.log('hereee');
  return (dispatch) => {
    const url = APIUrls.userFriends(userId);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('friends list', data);
        if (data.success) {
          dispatch(fetchFriendsSuccess(data.data.friends));
          return;
        }
        // dispatch(fetchFriendsFailed(data.message));
      });
  };
}

export function addFriend(friend) {
  return {
    type: ADD_FRIEND,
    friend,
  };
}

export function removeFriend(userId) {
  return {
    type: REMOVE_FRIEND,
    userId,
  };
}
