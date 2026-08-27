import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDG6y5SRRRz0jbeIBZaaSbkbYa_i6HlHRg",
  authDomain: "progra-3-auto.firebaseapp.com",
  projectId: "progra-3-auto",
  storageBucket: "progra-3-auto.firebasestorage.app",
  messagingSenderId: "517111358810",
  appId: "1:517111358810:web:7b7b10ee4d1a28b8cbff63"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};