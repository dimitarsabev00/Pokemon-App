// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

//Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA4Pl6rHhLDM9mWeVBJ8xn0nLohga3NriU",
  authDomain: "pokemon-app-d14c1.firebaseapp.com",
  projectId: "pokemon-app-d14c1",
  storageBucket: "pokemon-app-d14c1.appspot.com",
  messagingSenderId: "1033447572896",
  appId: "1:1033447572896:web:e0ecf93294abcf76bed0c5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const pokemonListRef = collection(db, "pokemonList");
