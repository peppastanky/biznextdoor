import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8NGtcaPy4r6eJ54kzGuO7LMQ2UCI2MuY",
  authDomain: "biznextdoor.firebaseapp.com",
  projectId: "biznextdoor",
  storageBucket: "biznextdoor.firebasestorage.app",
  messagingSenderId: "200347692008",
  appId: "1:200347692008:web:4bbb584f3b7e2034c9525d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
