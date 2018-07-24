import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCY7cmC91wSJTpgvgg0x51yAoCbZv-0EsE',
  authDomain: 'my-movies-e18df.firebaseapp.com',
  databaseURL: 'https://my-movies-e18df.firebaseio.com',
}

firebase.initializeApp(config)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

export const ref = firebase.database().ref();
export const auth = firebase.auth;
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
