import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import axios from 'axios';
admin.initializeApp();

const firestore = admin.firestore();

export const createUserRecordOnSignUp = functions.auth.user().onCreate(async (user, context) => {
	const { uid, email } = user;
	return firestore.collection('users').doc(uid).create({
		createdAt: context.timestamp,
		email,
	});
});

export const getHome = async () => {
	return await axios
		.get('https://www.redfin.com/stingray/api/home/details/belowTheFold?propertyId=103549918&accessLevel=1')
		.then((res) => {
			return JSON.parse(res.data.slice(4));
		});
};

export const getRedfin = functions.https.onRequest(async (req, res) => {
	res.status(200).send(await getHome());
});
