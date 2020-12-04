import {
	Avatar,
	Button,
	Card,
	Container,
	CssBaseline,
	FormControlLabel,
	Grid,
	makeStyles,
	TextField,
	Typography,
	Link as MuiLink,
	Checkbox,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';
import React from 'react';
import { LOGIN, RESET_PASSWORD, SIGNUP } from '../../constants/routes';
import { useForm } from 'react-hook-form';
import { useLogin, useSignup } from '../../hooks';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(25),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '15px',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export const Signup = () => {
	const classes = useStyles();
	const { register, handleSubmit, errors, watch, formState } = useForm<{
		email: string;
		password: string;
		confirmPassword: string;
	}>({
		mode: 'onChange',
	});
	const { password } = watch(['password']);
	const signup = useSignup();

	const handleFormSubmit = (formParams: { email: string; password: string }) => {
		signup(formParams.email, formParams.password).catch((err) => console.error(err));
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
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
					<FormControlLabel
						control={<Checkbox name='admin' inputRef={register} />}
						label='Administrator'
						labelPlacement='end'
					/>
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
