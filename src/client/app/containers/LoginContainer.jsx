import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class LoginContainer extends PureComponent {
	static propTypes = {
		setUser: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			userName: '',
			password: '',
		}
	}

	handleChangeProperty = (property) => (event) => {
		this.setState({
			[property]: event.target.value,
		});
	};

	handleSetUser = (event) => {
		const { setUser } = this.props;
		const { userName, password } = this.state;

		setUser(userName, password);

		event.preventDefault();
	};

	render() {
		return (
			<div>
				<label>
					<input type="text" onChange={this.handleChangeProperty('userName')} value={this.state.userName} />
				</label>

				<label>
					<input type="password" onChange={this.handleChangeProperty('password')} value={this.state.password} />
				</label>

				<button type="submit" id="send" onClick={this.handleSetUser}>Send</button>
			</div>
		)
	}
}

export default LoginContainer;
