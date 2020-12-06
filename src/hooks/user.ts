import { useCreateGeneric, useDeleteGeneric, useUpdateGeneric, useUploadImage } from './generics';
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

export const useIsAdmin = (): [boolean, boolean, Error | undefined] => {
	const [user, loading, error] = useCurrentUser();
	return [Boolean(user?.admin), loading, error];
};

export const useUploadProfileImage = () => {
	const uploadImage = useUploadImage();
	const updateUser = useUpdateCurrentUser();
	return (fileName: string, image: File) =>
		uploadImage(fileName, image).then((url: string) => updateUser({ image: url }));
};
