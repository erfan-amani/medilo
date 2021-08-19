import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDw-hT0fUX6ogHVQuVwSDHnsFtFwr80TnM',
  authDomain: 'medilo.firebaseapp.com',
  projectId: 'medilo',
  storageBucket: 'medilo.appspot.com',
  messagingSenderId: '605656702690',
  appId: '1:605656702690:web:f39c007c43513d587948bb',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();

export const signinWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};

export const signinWithTwitter = () => {
  const provider = new firebase.auth.TwitterAuthProvider();
  return auth.signInWithPopup(provider);
};
