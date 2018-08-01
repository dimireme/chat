import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ListItem, Avatar, ListItemText, Divider } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import style from "./Message.css";

class Message extends PureComponent {
	static propTypes = {
		message: PropTypes.shape({
			author: PropTypes.string,
			text: PropTypes.string,
			timestamp: PropTypes.string,
		}),
	};

	render() {
		const { author, text } = this.props.message;
		return (
			<div>
				<ListItem divider dense disableGutters className={style.item}>
					<Avatar>
						<ImageIcon />
					</Avatar>
					<ListItemText primary={text} secondary={author} />
				</ListItem>
			</div>
		);
	}
}

export default Message;
