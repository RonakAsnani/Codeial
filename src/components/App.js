import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import { PostList } from './index';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    return (
      <div>
        <nav className="nav">
          <div className="left-div">
            <img
              src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
              alt="Logo"
            />
          </div>
          <div className="search-container">
            <img className="search-icon" src="" alt="search icon" />
            <input placeholder="Search" />
          </div>
          <div className="search-results">
            <ul>
              <li className="search-results-row">
                <img
                  src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png"
                  alt="avatar"
                />
                <span>Jon Doe</span>
              </li>
              <li className="search-results-row">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="avatar"
                />
                <span>Jon Doe</span>
              </li>
            </ul>
          </div>
          <div className="right-nav">
            <div className="user">
              <img
                src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                alt="avatar"
                id="user-dp"
              />
              <span>Jon Doe</span>
            </div>
            <div className="nav-links">
              <ul>
                <li>Log In</li>
                <li>Log Out</li>
                <li>Register</li>
              </ul>
            </div>
          </div>
        </nav>
        <PostList posts={posts} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
