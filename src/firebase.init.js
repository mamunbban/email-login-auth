// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


//dont share config to the public...
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWs3IiIK4FsiDuJEgvyTuQcBjv_kEI3ao",
  authDomain: "email-password-auth-9b318.firebaseapp.com",
  projectId: "email-password-auth-9b318",
  storageBucket: "email-password-auth-9b318.firebasestorage.app",
  messagingSenderId: "608652784739",
  appId: "1:608652784739:web:f8f8ce6b11078224083456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);