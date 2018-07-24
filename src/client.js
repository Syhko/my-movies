import firebase from 'firebase';

export const { auth } = firebase;
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
