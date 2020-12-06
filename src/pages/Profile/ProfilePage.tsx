import React from 'react';
import { useCurrentUser } from '../../hooks';
import Loading from '../../components/Loading';
import { Card, CardContent, Grid } from '@material-ui/core';
import ProfileImage from './ProfileImage';
import ProfileInfo from './ProfileInfo';

export const ProfilePage = () => {
	const [profile, loading, error] = useCurrentUser();

	return (
		<Card>
			{loading || error ? (
				<Loading />
			) : (
				<CardContent>
					<Grid container direction='row' justify='center'>
						<Grid item sm={4} md={3}>
							<ProfileImage />
						</Grid>
						<Grid item sm={12} md={9}>
							<ProfileInfo profile={profile} />
						</Grid>
					</Grid>
				</CardContent>
			)}
		</Card>
	);
};

export default ProfilePage;
