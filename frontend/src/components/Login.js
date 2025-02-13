import React, { useState } from 'react';

function Login() {
	var loginName;
	var loginPassword;

	const [message, setMessage] = useState('');
	const app_name = 'cop4331-g6-lp-c6d624829cab'
	function buildPath(route) {
		if (process.env.NODE_ENV === 'production') {
			return 'https://' + app_name + '.herokuapp.com/' + route;
		}
		else {
			return 'http://localhost:5000/' + route;
		}
	}


	const doLogin = async event => {
		event.preventDefault();

		var obj = { login: loginName.value, password: loginPassword.value };
		var js = JSON.stringify(obj);

		try {
			const response = await fetch(buildPath('api/login'),
				{ method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

			var res = JSON.parse(await response.text());

			if (res.id <= 0) {
				setMessage('User/Password combination incorrect');
			}
			else {
				var user = { firstName: res.firstName, lastName: res.lastName, id: res.id }
				localStorage.setItem('user_data', JSON.stringify(user));
				setMessage('');
				window.location.href = '/backend';
			}
		}
		catch (e) {
			alert(e.toString());
			return;
		}

	};

	return (
		<div id="loginDiv">
			<form onSubmit={doLogin}>
				<span id="inner-title">PLEASE LOG IN</span><br />
				<input type="text" id="loginName" placeholder="Username"
					ref={(c) => loginName = c} /><br />
				<input type="password" id="loginButton" placeholder="Password"
					ref={(c) => loginPassword = c} /><br />
				<input type="submit" id="loginButton" class="buttons"
					value="Do It" onClick={doLogin} />
			</form>
			<span id="loginResult"></span>
		</div>
	);
};

export default Login;