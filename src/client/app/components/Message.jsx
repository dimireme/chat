import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Message extends PureComponent {
	static propTypes = {
		message: PropTypes.shape({
			author: PropTypes.string,
			text: PropTypes.string,
			timestamp: PropTypes.string,
		}),
	};

	render() {
		const { author, text, timestamp } = this.props.message;
		return (
			<li>
				{author}:{text}<br/>
				<i>{timestamp}</i>
			</li>
		);
	}
}

export default Message;
