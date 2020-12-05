import { useCreateGeneric, useDeleteGeneric, useUpdateGeneric } from './generics';
import { useCollection, useDocument } from './queries';
import { User } from '../models';
import { useAuth } from './auth';

export const useCreateUser = () => {
	const createGeneric = useCreateGeneric<User>();
	return (user: User) => createGeneric('users', user);
};

export const useUpdateUser = () => {
	const updateGeneric = useUpdateGeneric<User>();
	return (userUID: string, user: User) => updateGeneric('users', userUID, user);
};

export const useUpdateCurrentUser = () => {
	const [auth] = useAuth();
	const updateUser = useUpdateUser();
	return (data: User) => updateUser(auth?.uid || '', data);
};

export const useDeleteUser = () => {
	const deleteGeneric = useDeleteGeneric();
	return (userUID: string) => deleteGeneric('users', userUID);
};

export const useSelectedUser = (userUID: string) => {
	return useDocument<User>('users', userUID);
};

export const useUsers = () => {
	return useCollection<User>('users');
};

export const useCurrentUser = () => {
	const [auth] = useAuth();
	return useSelectedUser(auth?.uid || 'noAuth');
};

export const useIsAdmin = () => {
	const [user] = useCurrentUser();
	return user.admin;
};
