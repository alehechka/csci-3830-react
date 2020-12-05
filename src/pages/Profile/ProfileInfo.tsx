import React from 'react';
import { useCurrentUser } from '../../hooks';

const ProfileInfo = () => {
	const [profile] = useCurrentUser();
	return <div>{`${profile.firstName} ${profile.lastName}`}</div>;
};

export default ProfileInfo;
