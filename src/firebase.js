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

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const db = firebaseApp.firestore();
export const storage = firebaseApp.storage();
export const auth = firebaseApp.auth();

export const signoutRequest = () => {
  return auth.signOut();
};

export default firebase;
