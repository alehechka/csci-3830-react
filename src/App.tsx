import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CONFIRM_RESET_PASSWORD, LOGIN, RESET_PASSWORD, SIGNUP } from './constants/routes';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact {...LOGIN} />
				<Route exact {...SIGNUP} />
				<Route exact {...RESET_PASSWORD} />
				<Route exact {...CONFIRM_RESET_PASSWORD} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
