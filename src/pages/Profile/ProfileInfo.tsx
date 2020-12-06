import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
} from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateCurrentUser } from '../../hooks';
import { User } from '../../models';

const ProfileInfo = ({ profile }: { profile: User }) => {
	const { register, handleSubmit, formState } = useForm<User>({
		mode: 'onChange',
		defaultValues: profile,
	});

	const updateUser = useUpdateCurrentUser();
	const handleUpdateSubmit = (formParams: User) => {
		updateUser(formParams);
	};

	console.log(formState);

	return (
		<Card variant='outlined'>
			<form onSubmit={handleSubmit(handleUpdateSubmit)}>
				<CardContent>
					<Grid container justify='space-evenly' spacing={2}>
						<Grid item xs={6}>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='firstName'
								name='firstName'
								label='First Name'
								inputRef={register({
									required: true,
								})}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								name='lastName'
								label='Last Name'
								inputRef={register({
									required: true,
								})}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								variant='outlined'
								margin='normal'
								fullWidth
								name='title'
								label='Job Title'
								inputRef={register({})}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								variant='outlined'
								margin='normal'
								fullWidth
								name='major'
								label='Major in College'
								inputRef={register()}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								variant='outlined'
								margin='normal'
								fullWidth
								name='color'
								label='Favorite Color'
								inputRef={register()}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								variant='outlined'
								margin='normal'
								fullWidth
								type='number'
								name='number'
								label='Favorite Number'
								inputRef={register()}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox name='admin' inputRef={register} defaultChecked={profile.admin} />}
								label='Administrator'
								labelPlacement='end'
							/>
						</Grid>
					</Grid>
				</CardContent>
				<CardActionArea>
					<Grid container>
						<Grid item xs></Grid>
						<Grid item style={{ margin: '8px' }}>
							<Button variant='contained' color='primary' type='submit' disabled={!formState.isDirty}>
								Save
							</Button>
						</Grid>
					</Grid>
				</CardActionArea>
			</form>
		</Card>
	);
};

export default ProfileInfo;
