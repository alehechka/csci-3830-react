import {
	Avatar,
	Button,
	Card,
	Container,
	CssBaseline,
	Grid,
	makeStyles,
	TextField,
	Typography,
	Link as MuiLink,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';
import React from 'react';
import { RESET_PASSWORD, SIGNUP } from '../../constants/routes';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../hooks';

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

export const Login = () => {
	const classes = useStyles();
	const { register, handleSubmit, errors, formState } = useForm<{ email: string; password: string }>({
		mode: 'onChange',
	});
	const login = useLogin();

	const handleFormSubmit = (formParams: { email: string; password: string }) => {
		login(formParams.email, formParams.password).catch((err) => console.error(err));
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<Card className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign in
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
						inputRef={register({ required: true, minLength: 6 })}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						disabled={!formState.isValid}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<MuiLink href='#' variant='body2' component={Link} to={RESET_PASSWORD.path}>
								Forgot password?
							</MuiLink>
						</Grid>
						<Grid item>
							<MuiLink href='#' variant='body2' component={Link} to={SIGNUP.path}>
								{"Don't have an account? Sign Up"}
							</MuiLink>
						</Grid>
					</Grid>
				</form>
			</Card>
		</Container>
	);
};

export default Login;
