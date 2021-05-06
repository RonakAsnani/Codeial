import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import {
  Home,
  Navbar,
  Page404,
  Login,
  Signup,
  Settings,
  UserProfile,
} from './index';
import jwt_decode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import { fetchUserFriends } from '../actions/friends';
//import { getAuthTokenFromLocalStorage } from '../helpers/utils';

//import { getAuthTokenFromLocalStorage } from '../helpers/utils';

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, component: Component } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt_decode(token);

      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
    this.props.dispatch(fetchUserFriends());
  }

  render() {
    const { posts, auth, friends } = this.props;
    //console.log(posts);
    return (
      <Router>
        <div>
          <Navbar />
          {/* <PostList posts={posts} /> */}
          <Switch>
            <Route
              exact={true}
              path="/"
              render={(props) => {
                return (
                  <Home
                    {...props}
                    posts={posts}
                    friends={friends}
                    isLoggedin={auth.isLoggedin}
                  />
                );
              }}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute
              exact
              path="/settings"
              component={Settings}
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              exact
              path="/user/:userId"
              component={UserProfile}
              isLoggedin={auth.isLoggedin}
            />
            <Route component={Page404}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
