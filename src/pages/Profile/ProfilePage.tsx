import React from 'react';
import { useCurrentUser } from '../../hooks';
import Loading from '../../components/Loading';
import { Card, Grid } from '@material-ui/core';
import ProfileImage from './ProfileImage';
import ProfileInfo from './ProfileInfo';

export const ProfilePage = () => {
	// eslint-disable-next-line
	const [_, loading, error] = useCurrentUser();

	return (
		<Card>
			{loading || error ? (
				<Loading />
			) : (
				<Grid container>
					<Grid item xs={3}>
						<ProfileImage />
					</Grid>
					<Grid item xs={9}>
						<ProfileInfo />
					</Grid>
				</Grid>
			)}
		</Card>
	);
};

export default ProfilePage;
