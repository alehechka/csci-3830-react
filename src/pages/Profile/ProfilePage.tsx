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
					<Grid container>
						<Grid item xs={3}>
							<ProfileImage />
						</Grid>
						<Grid item xs={9}>
							<ProfileInfo profile={profile} />
						</Grid>
					</Grid>
				</CardContent>
			)}
		</Card>
	);
};

export default ProfilePage;
