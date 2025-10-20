import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBY4Y1GzuuRB04RlcFkJfz0O_L8x-02ioQ",
  authDomain: "sprintmobile-f129e.firebaseapp.com",
  projectId: "sprintmobile-f129e",
  storageBucket: "sprintmobile-f129e.firebasestorage.app",
  messagingSenderId: "249095557181",
  appId: "1:249095557181:web:03153002fa3aa958765a54",
  measurementId: "G-DEYWXPX578" 
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
