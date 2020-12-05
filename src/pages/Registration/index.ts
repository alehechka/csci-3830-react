import { makeStyles } from '@material-ui/core';

export * from './Login';
export * from './Signup';
export * from './ResetPassword';

export const useStyles = makeStyles((theme) => ({
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