import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { CONFIRM_RESET_PASSWORD, HOME, LOGIN, PROFILE, RESET_PASSWORD, SIGNUP } from './constants/routes';
import Navbar from './layouts/Navbar';

function App() {
	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: 'light', // 'dark',
				},
			}),
		[]
	);
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Navbar />

				<CssBaseline />
				<Switch>
					<PrivateRoute exact {...HOME} />
					<PrivateRoute exact {...PROFILE} />
					<Route exact {...LOGIN} />
					<Route exact {...SIGNUP} />
					<Route exact {...RESET_PASSWORD} />
					<Route exact {...CONFIRM_RESET_PASSWORD} />
					<PrivateRoute path='' />
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
