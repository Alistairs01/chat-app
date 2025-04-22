// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";    
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGePplVvvW4rxxl_muWS39KO7HmA3cpQY",
  authDomain: "chat-app-14b56.firebaseapp.com",
  projectId: "chat-app-14b56",
  storageBucket: "chat-app-14b56.firebasestorage.app",
  messagingSenderId: "238151297851",
  appId: "1:238151297851:web:2c7beb513d9f96153a251e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);