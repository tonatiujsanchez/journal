// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: import.meta.env.API_KEY,
//     authDomain: import.meta.env.AUTH_DOMAIN,
//     projectId: import.meta.env.PROJECT_ID,
//     storageBucket: import.meta.env.STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
//     appId: import.meta.env.APP_ID,
// };

const firebaseConfig = {
    apiKey: "AIzaSyCvIj10x4RJfOYGC4W-Pp6XF3VtEEwjt3k",
    authDomain: "journal-react-js.firebaseapp.com",
    projectId: "journal-react-js",
    storageBucket: "journal-react-js.appspot.com",
    messagingSenderId: "369650215456",
    appId: "1:369650215456:web:d3feb1a61b55062d1a2a45"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );
