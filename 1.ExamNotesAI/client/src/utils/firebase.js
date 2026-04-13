
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
 authDomain: "notify-c3fe6.firebaseapp.com",
  projectId: "notify-c3fe6",
  storageBucket: "notify-c3fe6.firebasestorage.app",
  messagingSenderId: "957615831092",
  appId: "1:957615831092:web:c08d09af94bf6943ba7261"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}