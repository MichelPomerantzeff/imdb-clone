// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "imdb-clone-23e35.firebaseapp.com",
  projectId: "imdb-clone-23e35",
  storageBucket: "imdb-clone-23e35.appspot.com",
  messagingSenderId: "485815771790",
  appId: "1:485815771790:web:6b04fd3550ed15d2205fdf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)