import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PostList } from '.';

export default class PostsList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="posts-list">
        {posts.map((post) => {
          return (
            <div className="post-wrapper" key={post._id}>
              <div className="post-header">
                <div className="post-avatar">
                  <img
                    src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png"
                    alt="Avatar"
                  />
                  <div>
                    <span className="post-author">{post.user.name}</span>
                    <span className="post-time">A minute ago</span>
                  </div>
                </div>
                <div className="post-content">{post.content}</div>

                <div className="post-actions">
                  <div className="post-like">
                    <img
                      src="https://i.pinimg.com/736x/96/a2/71/96a27139e8352b383677452d7dd6edd2.jpg"
                      alt="Like"
                    />
                    <span>{post.likes.length}</span>
                  </div>
                  <div className="post-comment-icon">
                    <img
                      src="https://img.icons8.com/ios/452/comments.png"
                      alt="Comment"
                    />
                    <span>{post.comments.length}</span>
                  </div>
                </div>
                <div className="post-comment-box">
                  <input placeholder="Comment here..." />
                </div>
                <div className="post-comments-list">
                  <div className="post-comments-item">
                    <div className="post-comment-header">
                      <span className="post-comment-author">Jason Roy</span>
                      <span className="post-comment-time">a minute ago</span>
                      <span className="post-comment-likes">32</span>
                    </div>
                    <div className="post-comment-content">Random Comment</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};
