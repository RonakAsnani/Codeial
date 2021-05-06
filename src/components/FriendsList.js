import React from 'react';
import { FriendsListItem } from './index';

const FriendsList = (props) => {
  return (
    <div className="friends-list">
      <div className="header">Friends</div>

      {props.friends && props.friends.length === 0 && (
        <div className="no-friends">No friends found!</div>
      )}

      {props.friends &&
        props.friends.map((friend) => {
          return <FriendsListItem friend={friend.to_user} key={friend._id} />;
        })}
    </div>
  );
};

export default FriendsList;
