import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

export const firebaseConfig = {
    apiKey: "AIzaSyCHJJl87lTVRoX0gadRX4C3ZKuv9gdvlPo",
    authDomain: "graduates-mapping.firebaseapp.com",
    projectId: "graduates-mapping",
    storageBucket: "graduates-mapping.appspot.com",
    messagingSenderId: "763130009223",
    appId: "1:763130009223:web:1c16560d1540a7089d0a22"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
