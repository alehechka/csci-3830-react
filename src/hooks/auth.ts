import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../config/firebase';
import { User } from '@firebase/auth-types';

export const useLogin = () => {
	return (email: string, password: string) => firebase.auth().signInWithEmailAndPassword(email, password);
};

export const useLogout = () => {
	return () => firebase.auth().signOut();
};

export const useSignup = () => {
	return (email: string, password: string) => firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const useAuth = (): [User | null, boolean, Error] => useAuthState(firebase.auth());

export const useLoggedIn = () => {
	const [auth] = useAuth();
	return Boolean(auth && auth.uid);
};

export const useSendPasswordResetEmail = () => {
	const [user] = useAuth();
	return (email?: string) => firebase.auth().sendPasswordResetEmail(email || user?.email || '');
};

export const useResetPassword = () => {
	return (code: string, password: string) => firebase.auth().confirmPasswordReset(code, password);
};
