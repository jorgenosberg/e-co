// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
//import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoKtapWuK4utWFas-dX-NilZvPTFFRKrk",
  authDomain: "e-co-08.firebaseapp.com",
  databaseURL: "https://e-co-08-default-rtdb.firebaseio.com",
  projectId: "e-co-08",
  storageBucket: "e-co-08.appspot.com",
  messagingSenderId: "257505410947",
  appId: "1:257505410947:web:ac6bebf95fcbf4b32600b6",
  measurementId: "G-F36KJTHCEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence)
export const db = getDatabase(app);

