import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
admin.initializeApp();

const firestore = admin.firestore();

export const createUserRecordOnSignUp = functions.auth.user().onCreate(async (user, context) => {
	const { uid, email } = user;
	return firestore.collection('users').doc(uid).create({
		createdAt: context.timestamp,
		email,
	});
});
