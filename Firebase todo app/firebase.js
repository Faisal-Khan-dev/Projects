// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs,doc,setDoc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getAuth ,signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBR2KP6pL-OYxLzL-xhuoD0uhcPPYC9bMM",
    authDomain: "todo-app-1a2d2.firebaseapp.com",
    projectId: "todo-app-1a2d2",
    storageBucket: "todo-app-1a2d2.firebasestorage.app",
    messagingSenderId: "972981353814",
    appId: "1:972981353814:web:6abf67fb72ed8df92beaf7"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export{ app, db, auth,signInWithEmailAndPassword, createUserWithEmailAndPassword, collection, addDoc, getDocs,doc,setDoc, deleteDoc, updateDoc }