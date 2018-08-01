import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import style from "./newMessageForm.css";
import { Grid, Button, TextField, Icon } from '@material-ui/core';
import SendIcon from '@material-ui/icons/send';

class NewMessageForm extends PureComponent {
	static propTypes = {
		sendMessage: PropTypes.func,
		user: PropTypes.string,
	};

	constructor(props) {
		super(props);

		this.state = {
			text: '',
		}
	}

	handleChangeText = (event) => {
		this.setState({
			text: event.target.value
		});

		event.preventDefault();
	};

	handleSendText = (event) => {
		const { user, sendMessage } = this.props;
		const { text } = this.state;

		if(!text) return;

		const newMessage = {
			author: user,
			text: text,
			timestamp: new Date(),
		};

		sendMessage(newMessage);

		this.setState({
			text: '',
		});

		event.preventDefault();
	};

	render() {
		return (
			<div className={style.form}>
				<Grid container spacing={8} alignItems="flex-end" wrap="nowrap">
					<Grid item>
						<TextField
							multiline
							rowsMax="1"
							placeholder="message"
							onChange={this.handleChangeText}
							value={this.state.text}
							className={style.input}
						/>
					</Grid>
					<Grid item>
						<Button variant="contained" size="small" onClick={this.handleSendText}>
							<SendIcon fontSize="inherit" />
						</Button>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default NewMessageForm;
