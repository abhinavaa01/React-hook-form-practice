// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FirebaseApiKey,
  authDomain: process.env.NEXT_PUBLIC_FirebaseAuthDomain ,
  projectId: process.env.NEXT_PUBLIC_FirebaseProjectId ,
  storageBucket: process.env.NEXT_PUBLIC_FirebaseStorageBucket ,
  messagingSenderId: process.env.NEXT_PUBLIC_FirebaseMessagingSenderId ,
  appId: process.env.NEXT_PUBLIC_FirebaseAppId ,
  measurementId: process.env.NEXT_PUBLIC_FirebaseMeasurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);