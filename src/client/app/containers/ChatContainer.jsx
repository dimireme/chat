import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import Message from '../components/Message';
import NewMessageForm from '../components/NewMessageForm';

class ChatContainer extends PureComponent {
	static propTypes = {
		user: PropTypes.string,
	};

	constructor(props) {
		super(props);

		this.state = {
			messages: [],
		};

		this.socket = io('http://localhost:3000');
		this.socket.on('message', this.addMessage);
	}

	componentWillMount() {
		fetch('http://localhost:3000/getHistory')
		.then(res => res.json())
		.then(messages => {
			this.setState({
				messages: this.state.messages.concat(messages),
			});
		});
	}

	sendMessage = (newMessage) => {
		this.socket.emit('message', newMessage);
	};

	addMessage = (newMessage) => {
		this.setState({
			messages: this.state.messages.concat(newMessage),
		});
	};

	render() {
		const { messages } = this.state;

		return (
			<div>
				<ul>
					{ messages.map((message, i) => <Message message={message} key={i}/>) }
				</ul>
				<NewMessageForm user={this.props.user} sendMessage={this.sendMessage}/>
			</div>
		)
	}
}

export default ChatContainer;
