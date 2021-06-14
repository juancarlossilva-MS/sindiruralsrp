import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDPx6fGmbOJFWeTxJHM2KQRegtbsXOOO3A",
    authDomain: "sindiruralsrp.firebaseapp.com",
    databaseURL: "https://sindiruralsrp-default-rtdb.firebaseio.com",
    projectId: "sindiruralsrp",
    storageBucket: "sindiruralsrp.appspot.com",
    messagingSenderId: "130462633564",
    appId: "1:130462633564:web:ca0ba6459240f179262099"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}

const fire = firebase;
export default fire;