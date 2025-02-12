// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWCvh9l_PeIaQ85sZqjY8BEJU558yk6nU",
  authDomain: "form-validation-aa01.firebaseapp.com",
  projectId: "form-validation-aa01",
  storageBucket: "form-validation-aa01.firebasestorage.app",
  messagingSenderId: "303262829340",
  appId: "1:303262829340:web:062146418c263bbd8648d9",
  measurementId: "G-7JPGRWZ8WY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);