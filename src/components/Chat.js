import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import '../chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [], //{content:'some messages',self: true/false}
      typedMessage: '',
    };
    this.socket = io.connect('http://54.237.158.65:5000');
    this.userEmail = props.user.email;

    if (this.userEmail) {
      this.setupConnections();
    }
  }
  setupConnections = () => {
    const socketConnection = this.socket;
    const self = this;
    this.socket.on('connect', function () {
      console.log('connection esatablished');

      socketConnection.emit('join_room', {
        user_email: this.userEmail,
        chatroom: 'codeial',
      });
      socketConnection.on('user_joined', function (data) {
        console.log('NEW USER JOINED', data);
      });
    });

    this.socket.on('recieve_message', function (data) {
      // add message to state
      const { messages } = self.state;
      const messageObject = {};
      messageObject.content = data.message;

      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      }

      self.setState({
        messages: [...messages, messageObject],
        typedMessage: '',
      });
    });
  };
  handleSubmit = () => {
    const { typedMessage } = this.state;

    if (typedMessage && this.userEmail) {
      this.socket.emit('send_message', {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: 'codeial',
      });
    }
  };
  render() {
    const { typedMessage, messages } = this.state;
    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img
            src="https://cdn1.iconfinder.com/data/icons/outline-6/96/circle-minus-512.png"
            alt="minus"
            height={17}
          />
        </div>
        <div className="chat-messages">
          {messages.map((message) => {
            return (
              <div
                className={
                  message.self
                    ? 'chat-bubble self-chat'
                    : 'chat bubble other-chat'
                }
              >
                {message.content}
              </div>
            );
          })}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Send</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToProps)(Chat);
