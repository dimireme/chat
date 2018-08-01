import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import style from "./loginContainer.css";
import { TextField, Button, Card, CardContent, CardActions } from '@material-ui/core';

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
				<Card className={style.card}>
					<CardContent>
						<TextField
							id="login"
							label="USERNAME"
							placeholder="name@app.ru"
							margin="normal"
							onChange={this.handleChangeProperty('userName')}
							value={this.state.userName}
						/>

						<TextField
							id="password"
							label="PASSWORD"
							type="password"
							placeholder="password"
							margin="normal"
							onChange={this.handleChangeProperty('password')}
							value={this.state.password}
						/>
					</CardContent>

					<CardActions disableActionSpacing>
						<Button fullWidth variant="contained" color="primary" onClick={this.handleSetUser}>
							Get Started
						</Button>
					</CardActions>

				</Card>
			</div>
		)
	}
}

export default LoginContainer;
