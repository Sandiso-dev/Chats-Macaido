// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getStorage} from "firebase/storage"
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBltLzNNGt_6y8UEJ7xoD1v5kxM0bIJeYE",
  authDomain: "messege-me-396ef.firebaseapp.com",
  projectId: "messege-me-396ef",
  storageBucket: "messege-me-396ef.appspot.com",
  messagingSenderId: "46298552807",
  appId: "1:46298552807:web:ba7aa4f4d309c841bd0542",
  measurementId: "G-3SXD58DFB8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
//For login authentication
export const auth = getAuth();
//for uploading images
export const storage = getStorage();
//geting data e.g searching for other users and messaging
export const db = getFirestore();