import React, { Component } from 'react';
import { PostList, FriendsList, Chat } from './index';

export default class Home extends Component {
  render() {
    const { posts, friends, isLoggedin } = this.props;
    //console.log(this.props);
    return (
      <div className="home">
        <PostList posts={posts} />
        {isLoggedin && <FriendsList friends={friends} />}
        {isLoggedin && <Chat />}
      </div>
    );
  }
}
