import firebase from '../config/firebase';

export const useCreateGeneric = <T>() => {
	return (collection: string, data: T) =>
		firebase
			.firestore()
			.collection(collection)
			.add({
				data,
			})
			.then((res) => res.get().then((res) => res.id));
};

export const useUpdateGeneric = <T>() => {
	return (collection: string, documentUID: string, data: T) =>
		firebase.firestore().collection(collection).doc(documentUID).update(data);
};

export const useDeleteGeneric = () => {
	return (collection: string, documentUID: string) =>
		firebase.firestore().collection(collection).doc(documentUID).delete();
};
