import React from 'react';
import { Redirect } from 'react-router-dom';
import { PROFILE, USERS } from '../../constants/routes';
import { useIsAdmin } from '../../hooks';

export const HomePage = () => {
	const isAdmin = useIsAdmin();

	if (isAdmin) {
		return <Redirect to={USERS.path} />;
	}

	return <Redirect to={PROFILE.path} />;
};

export default HomePage;
