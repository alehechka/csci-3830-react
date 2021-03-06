import { Avatar, Button, Card, Container, Grid, TextField, Typography, Link as MuiLink } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, Redirect, useLocation } from 'react-router-dom';
import React from 'react';
import { HOME, LOGIN } from '../../constants/routes';
import { useForm } from 'react-hook-form';
import { useLoggedIn, useSignup } from '../../hooks';
import { useStyles } from '.';

export const Signup = () => {
	const classes = useStyles();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const { register, handleSubmit, errors, watch, formState } = useForm<{
		email: string;
		password: string;
		confirmPassword: string;
	}>({
		mode: 'onChange',
		defaultValues: {
			email: params.get('email') || '',
		},
	});
	const { password } = watch(['password']);
	const signup = useSignup();

	const [submitError, setSubmitError] = React.useState<string | undefined>();
	const handleFormSubmit = (formParams: { email: string; password: string }) => {
		signup(formParams.email, formParams.password).catch((err) => setSubmitError(err.message));
	};

	const isLoggedIn = useLoggedIn();
	if (isLoggedIn) {
		return <Redirect to={HOME.path} />;
	}

	return (
		<Container component='main' maxWidth='xs'>
			<Card className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit(handleFormSubmit)}>
					<TextField
						variant='outlined'
						type='email'
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						autoFocus
						error={Boolean(errors.email)}
						inputRef={register({
							required: true,
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: 'invalid email address',
							},
						})}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						error={Boolean(errors.password)}
						inputRef={register({
							required: true,
							minLength: 6,
						})}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='confirmPassword'
						label='Confirm Password'
						type='password'
						id='confirm-password'
						autoComplete='confirm-password'
						error={Boolean(errors.confirmPassword)}
						inputRef={register({
							required: true,
							minLength: 6,
							validate: { matches: (value) => value === password },
						})}
					/>
					{submitError && (
						<Typography color='error' align='center' variant='body2'>
							{submitError}
						</Typography>
					)}
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						disabled={!formState.isValid}
					>
						Sign up
					</Button>
					<Grid container>
						<Grid item xs></Grid>
						<Grid item>
							<MuiLink href='#' variant='body2' component={Link} to={LOGIN.path}>
								{'Have an account? Login'}
							</MuiLink>
						</Grid>
					</Grid>
				</form>
			</Card>
		</Container>
	);
};

export default Signup;
