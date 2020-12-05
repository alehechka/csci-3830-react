import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import firebase from '../config/firebase';

export const useDocument = <T>(collectionName: string, documentUID: string): [T, boolean, Error | undefined] => {
	const [document, loading, error] = useDocumentData<T>(
		firebase.firestore().collection(collectionName).doc(documentUID),
		{ idField: 'id' }
	);
	return [document ? document : ({} as T), loading, error];
};

export const useCollection = <T>(collectionName: string): [T[], boolean, Error | undefined] => {
	const [documents, loading, error] = useCollectionData<T>(firebase.firestore().collection(collectionName), {
		idField: 'id',
	});
	return [documents ? documents : [], loading, error];
};
