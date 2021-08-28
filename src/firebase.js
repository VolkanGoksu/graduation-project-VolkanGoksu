import firebase from 'firebase';
const firebaseApp = firebase.initializeApp( {
    apiKey: "AIzaSyAqqu6kutRWsHw68v1KZ2AaQa_duzG8jF8",
    authDomain: "ticketapp-62137.firebaseapp.com",
    projectId: "ticketapp-62137",
    storageBucket: "ticketapp-62137.appspot.com",
    messagingSenderId: "195751449585",
    appId: "1:195751449585:web:bed10335717ec62389aa50"
  });

//   const firebaseApp  = firebase.initializeApp(firebaseConfig);
//   const db = firebaseApp.firestore();
  
//   const auth = firebase.auth();
//   export default db ;
//   export {auth};

const database = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export default database;
export {auth,provider};