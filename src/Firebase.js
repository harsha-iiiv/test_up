import * as firebase from "firebase";
import firestore from "firebase/firestore";

const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: "AIzaSyAp9RkCcVFEKPSngUEPtE1S9dbittBIuYU",
  authDomain: "test-e0252.firebaseapp.com",
  databaseURL: "https://test-e0252.firebaseio.com",
  projectId: "test-e0252",
  storageBucket: "test-e0252.appspot.com",
  messagingSenderId: "758224300827",
  appId: "1:758224300827:web:10f0c96070a3442f1801be",
  measurementId: "G-P87EJDLE5X",
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
