// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHJJl87lTVRoX0gadRX4C3ZKuv9gdvlPo",
  authDomain: "graduates-mapping.firebaseapp.com",
  projectId: "graduates-mapping",
  storageBucket: "graduates-mapping.appspot.com",
  messagingSenderId: "763130009223",
  appId: "1:763130009223:web:1c16560d1540a7089d0a22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.onload = () => {
    const signupForm = document.getElementById('signup-form');
    if (!signupForm) {
        console.error('The signup-form element could not be found');
        return;
    }

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get user info
        const fullName = signupForm['fullname'].value;
        const contact = signupForm['contact'].value;
        const email = signupForm['email'].value;
        const password = signupForm['password'].value;
        const confirmPassword = signupForm['copassword'].value;

        // Validate input
        if (fullName === '' || contact === '' || email === '' || password === '') {
            alert('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

          // Sign up the user & add firestore data
    createUserWithEmailAndPassword(auth, email, password).then(cred => {
      const userDoc = doc(db, 'users', cred.user.uid);  // Adjusted line
      return setDoc(userDoc, {                           // Adjusted line
          fullName: fullName,
          contact: contact,
          email: email,
      });
    }).then(() => {
      console.log("Document successfully written!");
      alert('Sign up successful!');  // Alert on successful sign up
      signupForm.reset();  // Reset the form
    }).catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
          alert('The email address is already in use by another account.');
      } else {
          console.error("Error: ", error);
      }
    });
      
        });
    }
