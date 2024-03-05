// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBFLmyuxO4wf9s0Cd2Dcbq0Fs5G0ppuT6c",
  authDomain: "phrasal-alpha-372913.firebaseapp.com",
  databaseURL:
    "https://phrasal-alpha-372913-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "phrasal-alpha-372913",
  storageBucket: "phrasal-alpha-372913.appspot.com",
  messagingSenderId: "659218835319",
  appId: "1:659218835319:web:1a40d8db35cb11d1452372",
  measurementId: "G-TRNMW996YQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
