// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FirebaseApiKey,
  authDomain: process.env.REACT_APP_FirebaseAuthDomain ,
  projectId: process.env.REACT_APP_FirebaseProjectId ,
  storageBucket: process.env.REACT_APP_FirebaseStorageBucket ,
  messagingSenderId: process.env.REACT_APP_FirebaseMessagingSenderId ,
  appId: process.env.REACT_APP_FirebaseAppId ,
  measurementId: process.env.REACT_APP_FirebaseMeasurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);