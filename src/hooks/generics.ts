import firebase from '../config/firebase';

export const useCreateGeneric = <T>() => {
	return (collection: string, data: T) =>
		firebase
			.firestore()
			.collection(collection)
			.add({
				data,
				createdAt: new Date(),
			})
			.then((res) => res.get().then((res) => res.id));
};

export const useUpdateGeneric = <T>() => {
	return (collection: string, documentUID: string, data: T) =>
		firebase
			.firestore()
			.collection(collection)
			.doc(documentUID)
			.update({ ...data, updatedAt: new Date() });
};

export const useDeleteGeneric = () => {
	return (collection: string, documentUID: string) =>
		firebase.firestore().collection(collection).doc(documentUID).delete();
};

export const useUploadImage = () => {
	return (fileName: string, image: File) =>
		firebase
			.storage()
			.ref()
			.child(fileName)
			.put(image)
			.then((snapshot) => snapshot.ref.getDownloadURL());
};
