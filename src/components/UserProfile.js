import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { addFriend, removeFriend } from '../actions/friends';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      succeess: null,
      error: null,
      successMessage: null,
    };
  }
  componentDidMount() {
    const { match } = this.props;
    if (match.params.userId) {
      // dispatch an action
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }
  checkIfUserAFriend = () => {
    console.log('this.props', this.props);
    const { match, friends } = this.props;
    const userId = match.params.userId;

    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  };
  handleAddFriendClick = async () => {
    const userId = this.props.match.params.userId;
    const url = APIUrls.addFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Added friend successfully!',
      });

      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  handleRemoveFriendClick = async () => {
    const { match } = this.props;
    const url = APIUrls.removeFriend(match.params.userId);

    const extra = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, extra);
    const data = await response.json();
    console.log('await data', data);

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Removed Friend successfully!',
      });
      this.props.dispatch(removeFriend(match.params.userId));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  render() {
    const { profile } = this.props;
    //console.log('params', params);
    const user = profile.user;

    if (profile.inProgress) {
      return <h1>Loading</h1>;
    }

    const ifUserAFriend = this.checkIfUserAFriend();

    const { success, error, successMessage } = this.state;
    return (
      <div>
        <div className="settings">
          <div className="img-container">
            <img
              src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
              alt="User profile"
            />
          </div>
          <div className="field">
            <div className="field-label">Name</div>
            <div className="field-value">{user.name}</div>
          </div>
          <div className="field">
            <div className="field-label">Email</div>
            <div className="field-value">{user.email}</div>
          </div>
          <div className="btn-grp">
            {!ifUserAFriend ? (
              <button
                className="button save-btn"
                onClick={this.handleAddFriendClick}
              >
                Add friend
              </button>
            ) : (
              <button
                className="button save-btn"
                onClick={this.handleRemoveFriendClick}
              >
                Remove friend
              </button>
            )}

            {success && (
              <div className="alert success-dailog">{successMessage}</div>
            )}
            {error && <div className="alert error-dailog">{error}</div>}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}
export default connect(mapStateToProps)(UserProfile);
