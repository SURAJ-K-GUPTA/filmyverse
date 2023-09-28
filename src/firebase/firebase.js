// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDThtL8RqWRowHcseQBah8RjNzFPKyKrT8",
  authDomain: "filmyverse-d85db.firebaseapp.com",
  projectId: "filmyverse-d85db",
  storageBucket: "filmyverse-d85db.appspot.com",
  messagingSenderId: "314516636163",
  appId: "1:314516636163:web:4a9adfdf10ae23d0248436"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db,'movie');
export const reviewsRef = collection(db,'reviews');
export const usersRef = collection(db,'users');


export default app;

export const auth = getAuth(app);
