import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBtwnJGffDi1J-YBrPWlU0aMjknVQpIVuc",
  authDomain: "pomocnik-cc6da.firebaseapp.com",
  projectId: "pomocnik-cc6da",
  storageBucket: "pomocnik-cc6da.appspot.com",
  messagingSenderId: "379679255811",
  appId: "1:379679255811:web:530dc719262d7e7f8d8d36",
};
export function initialize() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

export function attachAuthListener(handler) {
  console.log(firebase)
  return firebase.auth().onAuthStateChanged((user) => {
    handler(user);
  });
}

export async function createNewUser(email, password) {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
}

export async function signIn(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password);
}

export async function signOut() {
  await firebase.auth().signOut();
}
