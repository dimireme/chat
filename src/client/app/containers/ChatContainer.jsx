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
		this.setState({
			messages: this.state.messages.concat([
				{ author: 'Alex', text: 'Hello one!', timestamp: '13:48' },
				{ author: 'Andrey', text: 'Hi!', timestamp: '13:49' },
			]),
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
