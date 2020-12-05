import { Login, Signup, HomePage, ResetPassword, SendResetPasswordEmail, ProfilePage } from '../pages';

export interface Route {
	path: string;
	display: string;
	component: any;
}

export const LOGIN: Route = {
	path: '/login',
	display: 'Login',
	component: Login,
};

export const SIGNUP: Route = {
	path: '/signup',
	display: 'Sign up',
	component: Signup,
};

export const RESET_PASSWORD: Route = {
	path: '/reset_password',
	display: 'Reset Password',
	component: SendResetPasswordEmail,
};

export const CONFIRM_RESET_PASSWORD: Route = {
	path: '/reset_password/email',
	display: 'Confirm Password Reset',
	component: ResetPassword,
};

export const HOME: Route = {
	path: '/',
	display: 'Home',
	component: HomePage,
};

export const PROFILE: Route = {
	path: '/profile',
	display: 'Profile',
	component: ProfilePage,
};

export const USERS: Route = {
	path: '/users',
	display: 'Users',
	component: null,
};
