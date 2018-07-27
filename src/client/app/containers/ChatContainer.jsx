import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import style from "./chatContainer.css";
import { List, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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
			<div className={style.chat}>
				<AppBar position="static" color="inherit" className={style.header}>
					<Toolbar variant="dense">
						<Typography variant="title" color="inherit">
							Test task
						</Typography>
					</Toolbar>
				</AppBar>
				<List disablePadding className={style.list}>
					{ messages.map((message, i) => <Message message={message} key={i}/>) }
				</List>
				<NewMessageForm user={this.props.user} sendMessage={this.sendMessage}/>
			</div>
		)
	}
}

export default ChatContainer;
