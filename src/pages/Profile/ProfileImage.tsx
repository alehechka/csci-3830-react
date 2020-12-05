import React from 'react';
import { useCurrentUser } from '../../hooks';
import { Avatar, Badge, createStyles, makeStyles, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddPhotoAlternate';

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			display: 'flex',
			'& > *': {
				margin: theme.spacing(1),
			},
		},
		large: {
			width: theme.spacing(20),
			height: theme.spacing(20),
			margin: theme.spacing(5),
		},
	})
);

const SmallAvatar = withStyles((theme) =>
	createStyles({
		root: {
			width: theme.spacing(5),
			height: theme.spacing(5),
			border: `2px solid ${theme.palette.background.paper}`,
			marginBottom: theme.spacing(7),
			marginRight: theme.spacing(7),
			cursor: 'pointer',
		},
	})
)(Avatar);

export const ProfileImage = () => {
	const [profile] = useCurrentUser();
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Badge
				onClick={() => console.log('something')}
				overlap='circle'
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				badgeContent={
					<SmallAvatar>
						<AddIcon />
					</SmallAvatar>
				}
			>
				<Avatar src={profile.image} alt={`${profile.firstName} ${profile.lastName}`} className={classes.large} />
			</Badge>
		</div>
	);
};

export default ProfileImage;
