// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzgnk7wotQpRT2EBZPqsnzwMscUEcWiaQ",
  authDomain: "educonnect-d2c13.firebaseapp.com",
  projectId: "educonnect-d2c13",
  storageBucket: "educonnect-d2c13.appspot.com",
  messagingSenderId: "163663178773",
  appId: "1:163663178773:web:043bb820f95d5bed80f21c",
  measurementId: "G-ZMBB4SM62P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
export {auth,db};