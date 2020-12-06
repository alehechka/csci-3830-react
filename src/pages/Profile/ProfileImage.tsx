import React from 'react';
import { useCurrentUser, useUploadProfileImage } from '../../hooks';
import { Avatar, Badge, createStyles, makeStyles, Typography, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddPhotoAlternate';

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			display: 'flex',
			'& > *': {
				margin: theme.spacing(1),
			},
			flexDirection: 'column',
		},
		large: {
			width: theme.spacing(20),
			height: theme.spacing(20),
			marginTop: theme.spacing(5),
			marginRight: theme.spacing(5),
			marginLeft: theme.spacing(5),
		},
	})
);

const SmallAvatar = withStyles((theme) =>
	createStyles({
		root: {
			width: theme.spacing(5),
			height: theme.spacing(5),
			border: `2px solid ${theme.palette.background.paper}`,
			marginRight: theme.spacing(7),
			cursor: 'pointer',
		},
	})
)(Avatar);

export const ProfileImage = () => {
	const [profile] = useCurrentUser();
	const classes = useStyles();
	const fileUploadRef = React.useRef<any>();
	const uploadProfilePicture = useUploadProfileImage();
	return (
		<div className={classes.root}>
			<Badge
				onClick={() => fileUploadRef.current.click()}
				overlap='circle'
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				badgeContent={
					<SmallAvatar>
						<AddIcon />
						<input
							type='file'
							hidden
							accept='.png, .jpeg, .jpg'
							ref={fileUploadRef}
							onChange={(event) =>
								event?.target?.files?.[0] && uploadProfilePicture(event.target.files[0].name, event.target.files[0])
							}
						/>
					</SmallAvatar>
				}
			>
				<Avatar src={profile.image} alt={`${profile.firstName} ${profile.lastName}`} className={classes.large} />
			</Badge>
			<Typography component='caption' variant='body1'>
				<b>{`${profile.firstName} ${profile.lastName}`}</b>
			</Typography>
		</div>
	);
};

export default ProfileImage;
