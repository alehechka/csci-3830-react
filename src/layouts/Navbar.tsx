import {
	AppBar,
	Button,
	CssBaseline,
	Grid,
	Hidden,
	IconButton,
	Link,
	Menu,
	MenuItem,
	MenuProps,
	Theme,
	Toolbar,
	Typography,
	useMediaQuery,
	withStyles,
} from '@material-ui/core';
import { AccountCircle, Menu as MenuIcon, GitHub } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useCurrentUser, useLoggedIn, useLogout } from '../hooks';
import { useStyles } from './LayoutStyles';
import { Link as NavLink } from 'react-router-dom';
import { LOGIN, PROFILE, HOME, RESET_PASSWORD } from '../constants/routes';

const Navbar = () => {
	const xsDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
	const isLoggedIn = useLoggedIn();
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position='fixed'>{isLoggedIn ? <AuthToolbar xsDown={xsDown} /> : <NoAuthToolbar />}</AppBar>
		</div>
	);
};

const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5',
	},
})((props: MenuProps) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));

interface AuthToolbarProps {
	xsDown: boolean;
}

const AuthToolbar = ({ xsDown }: AuthToolbarProps) => {
	const [user] = useCurrentUser();
	const classes = useStyles();
	const history = useHistory();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Toolbar>
			<Header xsDown={xsDown} />

			<div>
				<Grid container spacing={2} alignItems='center'>
					<Grid item>
						<Hidden xsDown>
							<Typography variant='body1' className={classes.title}>
								{user?.firstName ? `Welcome, ${user.firstName}` : 'Welcome'}
							</Typography>
						</Hidden>
					</Grid>
					<Grid item>
						<IconButton color='inherit' onClick={handleClick}>
							<AccountCircle />
						</IconButton>
						<StyledMenu keepMounted open={Boolean(anchorEl)} onClose={handleClose} anchorEl={anchorEl}>
							<MenuItem
								onClick={() => {
									history.push(PROFILE.path);
									handleClose();
								}}
							>
								{PROFILE.display}
							</MenuItem>
							<MenuItem
								onClick={() => {
									history.push(RESET_PASSWORD.path);
									handleClose();
								}}
							>
								{RESET_PASSWORD.display}
							</MenuItem>
							<SignOutMenuItem />
						</StyledMenu>
						<IconButton color='inherit' onClick={() => window.open('https://github.com/alehechka/csci-3830-react')}>
							<GitHub />
						</IconButton>
					</Grid>
				</Grid>
			</div>
		</Toolbar>
	);
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
type LogoutProps = Record<string, any>;
export const SignOutMenuItem = ({ variant, color, ...rest }: LogoutProps) => {
	const signOut = useLogout();
	return (
		<MenuItem onClick={signOut} {...rest}>
			Sign Out
		</MenuItem>
	);
};

const NoAuthToolbar = () => {
	return (
		<Toolbar>
			<Header />

			<Link href='#' component={NavLink} to={LOGIN.path}>
				<Button>
					<Typography variant='body1'>Login</Typography>
				</Button>
				<IconButton color='default' onClick={() => window.open('https://github.com/alehechka/csci-3830-react')}>
					<GitHub />
				</IconButton>
			</Link>
		</Toolbar>
	);
};

const Header = ({ xsDown }: { xsDown?: boolean }) => {
	const classes = useStyles();
	return (
		<>
			<Typography variant='h5' className={classes.title} noWrap>
				<Link href={HOME.path} component={NavLink} to={LOGIN.path}>
					<Button>{!xsDown && <Typography variant='h5'>CSCI-3830 Final</Typography>}</Button>
				</Link>
			</Typography>
		</>
	);
};

export default Navbar;
