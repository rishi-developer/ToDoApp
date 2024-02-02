// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD995cb4u7EH4TPzBkpy3FOIEEEI1pIcy4",
  authDomain: "todoapp-6dc30.firebaseapp.com",
  projectId: "todoapp-6dc30",
  storageBucket: "todoapp-6dc30.appspot.com",
  messagingSenderId: "692885207603",
  appId: "1:692885207603:web:9cb45b5a290b62eab3c146",
  measurementId: "G-BHR8SBGJCE"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAnalytics(FIREBASE_APP);