import firebase from "firebase";

 // For Firebase JS SDK v7.20.0 and later, measurementId is optional

 const firebaseConfig = {
  apiKey: "AIzaSyDIq_t0UE2L6TGoWKBUFgP26pmTI1C9ApA",
  authDomain: "bt3103-week-6-fe49a.firebaseapp.com",
  projectId: "bt3103-week-6-fe49a",
  storageBucket: "bt3103-week-6-fe49a.appspot.com",
  messagingSenderId: "414680300955",
  appId: "1:414680300955:web:16262a474655a76892f53e",
  measurementId: "G-VN6N3GT6E6"
};
  firebase.initializeApp(firebaseConfig);
  var database = firebase.firestore();
  export default database;