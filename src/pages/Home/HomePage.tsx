import React from 'react';
import { Redirect } from 'react-router-dom';
import CenteredLoading from '../../components/Loading';
import { PROFILE, USERS } from '../../constants/routes';
import { useIsAdmin } from '../../hooks';

export const HomePage = () => {
	const [isAdmin, loading] = useIsAdmin();

	if (!loading) {
		if (isAdmin) return <Redirect to={USERS.path} />;
		else return <Redirect to={PROFILE.path} />;
	}

	return <CenteredLoading />;
};

export default HomePage;
