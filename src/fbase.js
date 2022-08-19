import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/storage";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAH3nzmegUptgInYIVUETEOskNnfiCmjXw",
    authDomain: "nwitter-c678f.firebaseapp.com",
    projectId: "nwitter-c678f",
    storageBucket: "nwitter-c678f.appspot.com",
    messagingSenderId: "600537641263",
    appId: "1:600537641263:web:18cdaffb1b17324b9931da"
  };

  const fireBaseApp = initializeApp(firebaseConfig);
  export const firebaseInstance=getAuth();
  export const authService=getAuth(fireBaseApp);
  export const dbService=getFirestore();