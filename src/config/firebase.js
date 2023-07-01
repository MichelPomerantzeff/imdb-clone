// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "movie-app-4e224.firebaseapp.com",
  projectId: "movie-app-4e224",
  storageBucket: "movie-app-4e224.appspot.com",
  messagingSenderId: "579218603210",
  appId: "1:579218603210:web:85554f56b082dacdda4833"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app)

export { db, auth };