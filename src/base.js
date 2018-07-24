import Rebase from 're-base';
import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCY7cmC91wSJTpgvgg0x51yAoCbZv-0EsE',
  authDomain: 'my-movies-e18df.firebaseapp.com',
  databaseURL: 'https://my-movies-e18df.firebaseio.com',
});

const base = Rebase.createClass(app.database());

export default base;
