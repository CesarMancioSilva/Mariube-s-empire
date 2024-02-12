// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLuf-thKJ14bcqcQOA3Yif-twVb0g-bNc",
  authDomain: "practrest.firebaseapp.com",
  projectId: "practrest",
  storageBucket: "practrest.appspot.com",
  messagingSenderId: "299515198022",
  appId: "1:299515198022:web:f1111b5c934838a33a2847"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;