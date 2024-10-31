// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJGLTF7g98LAVJ0KQSufSyi-z-aFMF83E",
  authDomain: "park-9e055.firebaseapp.com",
  projectId: "park-9e055",
  storageBucket: "park-9e055.appspot.com",
  messagingSenderId: "874532312543",
  appId: "1:874532312543:web:1516fbae96c5cade1e206a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
