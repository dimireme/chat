import React, { PureComponent } from 'react';

import ChatContainer from './containers/ChatContainer';
import LoginContainer from './containers/LoginContainer';


export default class App extends PureComponent {

	render() {

		const authorized = true;
		const user = 'Tester';

		return (
			<div>
				{authorized ? <ChatContainer user={user}/> : <LoginContainer />}
			</div>
		);
	}
}
