import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class LoginContainer extends PureComponent {
	static propTypes = {
		user: PropTypes.string,
		password: PropTypes.string,
	};

	render() {
		return (
			<div>
				<h2>Login Form</h2>
			</div>
		)
	}
}

export default LoginContainer;
