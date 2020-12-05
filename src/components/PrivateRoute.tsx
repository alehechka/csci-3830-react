import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { LOGIN } from '../constants/routes';
import { useLoggedIn } from '../hooks';

interface PrivateRouteProps extends RouteProps {
	/* eslint-disable  @typescript-eslint/no-explicit-any */
	component?: any;
	children?: any;
}

export const PrivateRoute = ({ component: Component, children, ...rest }: PrivateRouteProps) => {
	const isLoggedIn = useLoggedIn();
	return (
		<Route
			{...rest}
			render={(routeProps) =>
				isLoggedIn ? (
					children || <Component {...routeProps} />
				) : (
					<Redirect
						to={{
							pathname: LOGIN.path,
							state: { from: routeProps.location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
