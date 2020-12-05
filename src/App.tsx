import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { CONFIRM_RESET_PASSWORD, HOME, LOGIN, PROFILE, RESET_PASSWORD, SIGNUP } from './constants/routes';
import { useStyles } from './layouts/LayoutStyles';
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

	const styles = useStyles();
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Navbar />

				<CssBaseline />
				<main className={styles.content}>
					<div className={styles.drawerHeader} />
					<Switch>
						<PrivateRoute exact {...HOME} />
						<PrivateRoute exact {...PROFILE} />
						<Route exact {...LOGIN} />
						<Route exact {...SIGNUP} />
						<Route exact {...RESET_PASSWORD} />
						<Route exact {...CONFIRM_RESET_PASSWORD} />
						<PrivateRoute path='' />
					</Switch>
				</main>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
