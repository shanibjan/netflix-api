
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
const firebaseConfig = {
  apiKey: "AIzaSyATw7cBkOaQgRdbz6P2KNFj1SF0oYM4cfo",
  authDomain: "fb-netflix.firebaseapp.com",
  databaseURL: "https://fb-netflix-default-rtdb.firebaseio.com",
  projectId: "fb-netflix",
  storageBucket: "fb-netflix.appspot.com",
  messagingSenderId: "102489499911",
  appId: "1:102489499911:web:ca2a1cd8886f285bdfbda2",
  measurementId: "G-52MRDW4GZM"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);