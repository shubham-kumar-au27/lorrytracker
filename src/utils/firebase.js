// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-TuJG0e9-psXkpi1NXyts-XErxylq-hQ",
  authDomain: "lorryloading.firebaseapp.com",
  projectId: "lorryloading",
  storageBucket: "lorryloading.appspot.com",
  messagingSenderId: "310612558463",
  appId: "1:310612558463:web:f1282fface554c3996f54a",
  measurementId: "G-R3Z76Y3TCP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth()