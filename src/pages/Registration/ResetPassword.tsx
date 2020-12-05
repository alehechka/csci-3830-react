import { Avatar, Button, Card, Container, Grid, TextField, Typography, Link as MuiLink } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useStyles } from '.';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { Link, useLocation } from 'react-router-dom';
import { LOGIN } from '../../constants/routes';
import { useAuth, useSendPasswordResetEmail, useResetPassword, useLoggedIn } from '../../hooks';

export const SendResetPasswordEmail = () => {
	const classes = useStyles();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const [auth] = useAuth();
	const { register, handleSubmit, errors, formState, watch } = useForm<{ email: string }>({
		mode: 'onChange',
		defaultValues: {
			email: auth?.email || params.get('email') || '',
		},
	});
	const { email } = watch(['email']);

	const [submitError, setSubmitError] = React.useState<string | undefined>();
	const [emailSent, setEmailSent] = React.useState<string | undefined>();
	const sendPasswordResetEmail = useSendPasswordResetEmail();
	const handleFormSubmit = (formParams: { email: string }) => {
		sendPasswordResetEmail(formParams.email)
			.then(() => {
				setEmailSent(email);
			})
			.catch((err) => setSubmitError(err.message));
	};

	if (emailSent) {
		return <EmailSent email={emailSent} />;
	}

	return (
		<Container component='main' maxWidth='xs'>
			<Card className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Reset Password
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
						Send reset email
					</Button>
					<Grid container>
						<Grid item xs>
							<MuiLink
								href='#'
								variant='body2'
								component={Link}
								to={{
									pathname: LOGIN.path,
									search: `?email=${email}`,
								}}
							>
								Cancel
							</MuiLink>
						</Grid>
					</Grid>
				</form>
			</Card>
		</Container>
	);
};

const EmailSent = ({ email }: { email: string }) => {
	const classes = useStyles();
	return (
		<Container component='main' maxWidth='xs'>
			<Card className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Email Sent
				</Typography>
				<br />
				<Typography component='p' variant='body2'>
					Reset password email has been sent to: <b>{email}</b>
				</Typography>
			</Card>
		</Container>
	);
};

export const ResetPassword = () => {
	const classes = useStyles();
	const { register, handleSubmit, errors, watch, formState } = useForm<{
		password: string;
		confirmPassword: string;
	}>({
		mode: 'onChange',
	});
	const { password } = watch(['password']);

	const resetPassword = useResetPassword();
	const [submitError, setSubmitError] = React.useState<string | undefined>();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const [passwordChanged, setPasswordChanged] = React.useState<boolean>(false);
	const handleFormSubmit = (formParams: { password: string }) => {
		resetPassword(params.get('oobCode') || '', formParams.password)
			.then((res) => setPasswordChanged(true))
			.catch((err) => setSubmitError(err.message));
	};

	if (passwordChanged) {
		return <PasswordChanged />;
	}

	return (
		<Container component='main' maxWidth='xs'>
			<Card className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Reset Password
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit(handleFormSubmit)}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='New Password'
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
						Reset Password
					</Button>
					<Grid container>
						<Grid item>
							<MuiLink href='#' variant='body2' component={Link} to={LOGIN.path}>
								{'Cancel'}
							</MuiLink>
						</Grid>
					</Grid>
				</form>
			</Card>
		</Container>
	);
};

const PasswordChanged = () => {
	const classes = useStyles();
	const isLoggedIn = useLoggedIn();
	return (
		<Container component='main' maxWidth='xs'>
			<Card className={classes.paper}>
				<Avatar className={classes.avatar}>
					<DoneOutlineIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Password change successful
				</Typography>
				<br />
				<Typography component='p' variant='body2'>
					Your password has been successfully reset.
				</Typography>
				<br />
				{!isLoggedIn && (
					<Grid container>
						<Grid item xs></Grid>
						<Grid item>
							<MuiLink href='#' variant='body2' component={Link} to={LOGIN.path}>
								{'Return to login'}
							</MuiLink>
						</Grid>
					</Grid>
				)}
			</Card>
		</Container>
	);
};

export default SendResetPasswordEmail;
