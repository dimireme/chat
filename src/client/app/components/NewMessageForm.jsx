import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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

		if(text) {
			const newMessage = {
				author: user,
				text: text,
				timestamp: new Date(),
			};

			sendMessage(newMessage);

			this.setState({
				text: '',
			});
		}

		event.preventDefault();
	};

	render() {
		return (
			<div>
				<label>
					<input type="text" onChange={this.handleChangeText} value={this.state.text} />
				</label>

				<button type="submit" id="send" onClick={this.handleSendText}>Send</button>
			</div>
		)
	}
}

export default NewMessageForm;
