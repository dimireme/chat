import React, { PureComponent } from 'react';

import ChatContainer from './containers/ChatContainer';
import LoginContainer from './containers/LoginContainer';

import style from './app.css';

export default class App extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			user: '',
			password: '',
		};
	};

	setUser = (user, password) => {
		this.setState({
			user,
			password,
		})
	};

	render() {
		const { user } = this.state;

		return (
			<div className={style.container}>
				{ user ? <ChatContainer user={user}/> : <LoginContainer setUser={this.setUser}/> }
			</div>
		);
	}
}
