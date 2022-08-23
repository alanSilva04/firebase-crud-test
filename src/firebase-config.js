import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAqDW-UL-mfLep0-eT0lEZueIwTLEjS1Aw",
    authDomain: "crud-bootstrap-8ce22.firebaseapp.com",
    projectId: "crud-bootstrap-8ce22",
    storageBucket: "crud-bootstrap-8ce22.appspot.com",
    messagingSenderId: "807722111900",
    appId: "1:807722111900:web:82dded506439456975ee59",
    measurementId: "G-1EDRH4NE7S"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);