import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDw-hT0fUX6ogHVQuVwSDHnsFtFwr80TnM',
  authDomain: 'medilo.firebaseapp.com',
  projectId: 'medilo',
  storageBucket: 'medilo.appspot.com',
  messagingSenderId: '605656702690',
  appId: '1:605656702690:web:f39c007c43513d587948bb',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const storage = firebaseApp.storage();
export const auth = firebaseApp.auth();

export const signinWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};

export const signinWithTwitter = () => {
  const provider = new firebase.auth.TwitterAuthProvider();
  return auth.signInWithPopup(provider);
};

export const signinWithGithub = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  return auth.signInWithPopup(provider);
};

export const signoutRequest = () => {
  return auth.signOut();
};
